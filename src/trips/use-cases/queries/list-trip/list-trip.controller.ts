import { Controller, Get } from '@nestjs/common';
import { ListTripHandler } from './list-trip.handler';

@Controller()
export class ListTripController {
  constructor(private handler: ListTripHandler) {}

  @Get('/trips')
  async findAll() {
    const result = await this.handler.execute();

    return { message: 'Success', data: result };
  }
}
