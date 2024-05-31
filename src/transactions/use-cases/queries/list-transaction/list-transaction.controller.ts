import { Controller, Get, Inject } from '@nestjs/common';
import { ListTransactionHandler } from './list-transaction.handler';
import { LIST_TRANSACTION_HANDLER } from 'src/transactions/transaction.constants';

@Controller()
export class ListTransactionController {
  constructor(
    @Inject(LIST_TRANSACTION_HANDLER) private handler: ListTransactionHandler,
  ) {}

  @Get('/transactions')
  async findAll() {
    const result = await this.handler.execute();

    return { message: 'Success', data: result };
  }
}
