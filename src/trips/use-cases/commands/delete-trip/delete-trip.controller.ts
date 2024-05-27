import { Controller, Delete, Req } from '@nestjs/common';
import { DeleteTripHandler } from './delete-trip.handler';
import { Request } from 'express';

@Controller()
export class DeleteTripController {
  constructor(private handler: DeleteTripHandler) {}

  @Delete('/trips/:id')
  async delete(@Req() req: Request) {
    const { id } = req.params;

    await this.handler.execute(id);

    return { message: 'Success', data: { id } };
  }
}
