import { Controller, Delete, Inject, Req } from '@nestjs/common';
import { DeleteTripHandler } from './delete-trip.handler';
import { Request } from 'express';
import { DELETE_TRIP_HANDLER } from 'src/trips/trip.constants';

@Controller()
export class DeleteTripController {
  constructor(
    @Inject(DELETE_TRIP_HANDLER) private handler: DeleteTripHandler,
  ) {}

  @Delete('/trips/:id')
  async delete(@Req() req: Request) {
    const { id } = req.params;

    await this.handler.execute({ id });

    return { message: 'Success', data: { id } };
  }
}
