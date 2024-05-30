import { Controller, Inject, Put, Req } from '@nestjs/common';
import { UpdateStatusToWaitingApproveHandler } from './update-status-to-waiting-approve.handler';
import { Request } from 'express';
import { UPDATE_STATUS_TO_WAITING_APPROVE_HANDLER } from 'src/transactions/transaction.constants';

@Controller()
export class UpdateStatusToWaitingApproveController {
  constructor(
    @Inject(UPDATE_STATUS_TO_WAITING_APPROVE_HANDLER)
    private handler: UpdateStatusToWaitingApproveHandler,
  ) {}

  @Put('/transactions/:id/pay')
  async pay(@Req() req: Request) {
    const { id } = req.params;

    await this.handler.execute({ id });

    return { message: 'Success', data: { id } };
  }
}
