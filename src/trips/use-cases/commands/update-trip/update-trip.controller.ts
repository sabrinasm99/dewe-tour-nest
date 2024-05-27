import { Controller, Inject, Put, Req } from '@nestjs/common';
import { UpdateTripHandler } from './update-trip.handler';
import { Request } from 'express';
import { UPDATE_TRIP_HANDLER } from 'src/trips/trip.constants';

@Controller()
export class UpdateTripController {
  constructor(
    @Inject(UPDATE_TRIP_HANDLER) private handler: UpdateTripHandler,
  ) {}

  @Put('/trips/:id')
  async update(@Req() req: Request) {
    const params = req.body;
    const { id } = req.params;

    await this.handler.execute({ id, ...params });

    return { message: 'Success', data: { id } };
  }
}
