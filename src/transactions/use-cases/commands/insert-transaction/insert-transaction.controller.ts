import { Controller, Inject, Post, Req } from '@nestjs/common';
import { InsertTransactionHandler } from './insert-transaction.handler';
import { Request } from 'express';
import { INSERT_TRANSACTION_HANDLER } from 'src/transactions/transaction.constants';

@Controller()
export class InsertTransactionController {
  constructor(
    @Inject(INSERT_TRANSACTION_HANDLER)
    private handler: InsertTransactionHandler,
  ) {}

  @Post('/transactions')
  async insert(@Req() req: Request) {
    const params = req.body;

    const transaction = await this.handler.execute(params);

    const { id } = transaction.getProps();

    return { message: 'Success', data: { id } };
  }
}
