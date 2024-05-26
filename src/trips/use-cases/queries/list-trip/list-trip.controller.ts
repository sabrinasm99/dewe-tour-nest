import { Controller, Get, Inject } from '@nestjs/common';
import { ListTripHandler } from './list-trip.handler';
import { LIST_TRIP_HANDLER } from 'src/trips/trip.constants';

@Controller()
export class ListTripController {
  constructor(@Inject(LIST_TRIP_HANDLER) private handler: ListTripHandler) {}

  @Get('/trips')
  async findAll() {
    const result = await this.handler.execute();

    return { message: 'Success', data: result };
  }
}
