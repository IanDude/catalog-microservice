import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('SHOWS.GET_ALL')
  async getAll() {
    return await this.appService.getShows();
  }

  @MessagePattern('SHOWS.GET')
  async getShow(@Payload() showData: { showUUID: string }) {
    return await this.appService.getShowByUUID(showData.showUUID);
  }

  @MessagePattern('SHOWS.BOOK_SEAT')
  bookSeat(@Payload() bookingData: { seatId: string; userId: number }) {
    console.log('Starting Shows Book_Seat message pattern');
    return this.appService.onBookSeat(bookingData.seatId, bookingData.userId);
  }

  @EventPattern('PAYMENT.SUCCESS')
  onPaymentSuccess(@Payload() data: { seatId: string }) {
    return this.appService.markAsSold(data.seatId);
  }

  @EventPattern('PAYMENT.FAILED')
  onPaymentFailure(@Payload() data: { seatId: string }) {
    return this.appService.rollbackSeat(data.seatId);
  }

  @MessagePattern('SHOWS.UPDATE')
  updateShow(@Payload() updateData: { showUUID: string; newData: any }) {
    return this.appService.updateShow(updateData.showUUID, updateData.newData);
  }

  @MessagePattern('SHOWS.REMOVE')
  removeShow(@Payload() showData: { showUUID: string }) {
    return this.appService.removeShow(showData.showUUID);
  }
}
