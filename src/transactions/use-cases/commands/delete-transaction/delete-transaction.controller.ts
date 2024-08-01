import { Controller, Delete, Inject, Req } from '@nestjs/common';
import { DeleteTransactionHandler } from './delete-transaction.handler';
import { Request } from 'express';
import { DELETE_TRANSACTION_HANDLER } from 'src/transactions/transaction.constants';

@Controller()
export class DeleteTransactionController {
  constructor(
    @Inject(DELETE_TRANSACTION_HANDLER)
    private handler: DeleteTransactionHandler,
  ) {}

  @Delete('/transactions/:id')
  async delete(@Req() req: Request) {
    const { id } = req.params;

    await this.handler.execute({ id: Number(id) });

    return { message: 'Success', data: { id } };
  }
}
