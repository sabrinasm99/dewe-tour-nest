import { Controller, Get, Inject, Req } from '@nestjs/common';
import { FindTripByIdHandler } from './find-trip-by-id.handler';
import { Request } from 'express';
import { FIND_TRIP_BY_ID_HANDLER } from 'src/trips/trip.constants';

@Controller()
export class FindTripByIdController {
  constructor(
    @Inject(FIND_TRIP_BY_ID_HANDLER) private handler: FindTripByIdHandler,
  ) {}

  @Get('/trips/:id')
  async findTripById(@Req() req: Request) {
    const { id } = req.params;

    const result = await this.handler.execute({ id });

    return { message: 'Success', data: result };
  }
}
