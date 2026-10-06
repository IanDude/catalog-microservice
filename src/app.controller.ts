import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

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

  @MessagePattern('SHOWS.UPDATE')
  updateShow(@Payload() updateData: { showUUID: string; newData: any }) {
    return this.appService.updateShow(updateData.showUUID, updateData.newData);
  }

  @MessagePattern('SHOWS.REMOVE')
  removeShow(@Payload() showData: { showUUID: string }) {
    return this.appService.removeShow(showData.showUUID);
  }
}
