import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowsEntity } from './database/entities/show.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShowsEntity)
    private showsRepository: Repository<ShowsEntity>,
  ) {}

  async getShows() {
    const shows = await this.showsRepository.find();
    if (shows.length === 0) throw new RpcException('No Shows Found');
    return shows;
  }

  async getShowByUUID(showUUID: string) {
    const show = await this.showsRepository.findOne({
      where: { uuid: showUUID },
    });
    if (!show) throw new RpcException('Show not found');
    return `Should be show with uuid: ${showUUID}`;
  }

  updateShow(showUUID: string, newData: any) {
    return `Should update show with uuid: ${showUUID} with data: ${JSON.stringify(newData)}`;
  }

  removeShow(showUUID: string) {
    return `Should remove show with uuid: ${showUUID}`;
  }
}
