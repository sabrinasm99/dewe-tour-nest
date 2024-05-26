import { Controller, Inject, Post, Req } from '@nestjs/common';
import { InsertTripHandler } from './insert-trip.handler';
import { Request } from 'express';
import { INSERT_TRIP_HANDLER } from 'src/trips/trip.constants';

@Controller()
export class InsertTripController {
  constructor(
    @Inject(INSERT_TRIP_HANDLER) private handler: InsertTripHandler,
  ) {}

  @Post('/trips')
  async insert(@Req() req: Request) {
    const params = req.body;

    const trip = await this.handler.execute(params);

    const { id } = trip.getProps();

    return { message: 'Success', data: { id } };
  }
}
