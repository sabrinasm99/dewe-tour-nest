import { Controller, Inject, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { UpdateStatusToApprovedHandler } from './update-status-to-approved.handler';
import { UPDATE_STATUS_TO_APPROVED_HANDLER } from 'src/transactions/transaction.constants';

@Controller()
export class UpdateStatusToApprovedController {
  constructor(
    @Inject(UPDATE_STATUS_TO_APPROVED_HANDLER)
    private handler: UpdateStatusToApprovedHandler,
  ) {}

  @Put('/transactions/:id/approve')
  async approve(@Req() req: Request) {
    const { id } = req.params;

    await this.handler.execute({ id: Number(id) });

    return { message: 'Success', data: { id } };
  }
}
