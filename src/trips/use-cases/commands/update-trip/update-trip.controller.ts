import { Inject, Put, Req } from '@nestjs/common';
import { UpdateTripHandler } from './update-trip.handler';
import { Request } from 'express';
import { UPDATE_TRIP_HANDLER } from 'src/trips/trip.constants';

export class UpdateTripController {
  constructor(
    @Inject(UPDATE_TRIP_HANDLER) private handler: UpdateTripHandler,
  ) {}

  @Put()
  async update(@Req() req: Request) {
    const params = req.body;

    await this.handler.execute(params);

    return { message: 'Success', data: { id: params.id } };
  }
}
