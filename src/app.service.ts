import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowsEntity } from './database/entities/show.entity';
import { Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

interface Seats {
  id: string;
  status: 'AVAILABLE' | 'PENDING' | 'SOLD';
  lockedAt?: Date | null;
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShowsEntity)
    private showsRepository: Repository<ShowsEntity>,
    @Inject('ORDERS_SERVICE') private ordersClient: ClientProxy,
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
  ) {}

  private seats: Seats[] = [
    { id: '1A', status: 'AVAILABLE' },
    { id: '1B', status: 'AVAILABLE' },
    { id: '2A', status: 'AVAILABLE' },
    { id: '2B', status: 'AVAILABLE' },
    { id: '3A', status: 'AVAILABLE' },
  ];

  async getShows() {
    const shows = await this.showsRepository.find();
    if (shows.length === 0) throw new RpcException('No Shows Found');
    return shows;
  }

  onBookSeat(seatId: string, userId: number) {
    console.log('Starting onBookSeat method');
    const seat = this.seats.find((s) => s.id === seatId);
    if (!seat) throw new RpcException('Seat ID does not exist');

    if (seat.status !== 'AVAILABLE') {
      throw new RpcException('Seat is no longer available');
    }

    seat.status = 'PENDING';
    seat.lockedAt = new Date();
    this.usersClient.emit('TICKET.RESERVED', {
      seatId: seatId,
      userId: userId,
    });
    console.log(seat);
    return { message: 'Seat reserved. Processing payment...' };
  }

  markAsSold(seatId: string) {
    const seat = this.seats.find((s) => s.id === seatId);
    if (seat) seat.status = 'SOLD';
    console.log(`Seat ${seat?.id} has been sold`);
  }

  rollbackSeat(seatId: string) {
    const seat = this.seats.find((s) => s.id === seatId);
    if (seat) seat.status = 'AVAILABLE';
    console.log(`Seat ${seat?.id} is still available`);
  }

  async getShowByUUID(showUUID: string) {
    const show = await this.showsRepository.findOne({
      where: { uuid: showUUID },
    });
    if (!show) throw new RpcException('Show not found');
    return `Should be show with uuid: ${showUUID}`;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  unlockAbandonedSeats() {
    console.log('Sweeper running: Checking for abandoned seats...');

    const now = new Date();

    this.seats.forEach((seat) => {
      if (seat.status === 'PENDING' && seat.lockedAt) {
        const secondsLocked = (now.getTime() - seat.lockedAt.getTime()) / 1000;

        if (secondsLocked > 30) {
          seat.status = 'AVAILABLE';
          seat.lockedAt = null;
          console.log(`[Sweeper] Seat ${seat.id} was abandoned. Unlocked!`);
        }
      }
    });
  }

  updateShow(showUUID: string, newData: any) {
    return `Should update show with uuid: ${showUUID} with data: ${JSON.stringify(newData)}`;
  }

  removeShow(showUUID: string) {
    return `Should remove show with uuid: ${showUUID}`;
  }
}
