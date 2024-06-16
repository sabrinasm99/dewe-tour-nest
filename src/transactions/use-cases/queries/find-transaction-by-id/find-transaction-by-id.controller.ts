import { Controller, Get, Inject, Req } from '@nestjs/common';
import { FindTransactionByIdHandler } from './find-transaction-by-id.handler';
import { Request } from 'express';
import { FIND_TRANSACTION_BY_ID_HANDLER } from 'src/transactions/transaction.constants';

@Controller()
export class FindTransactionByIdController {
  constructor(
    @Inject(FIND_TRANSACTION_BY_ID_HANDLER)
    private handler: FindTransactionByIdHandler,
  ) {}

  @Get('/transactions/:id')
  async findTransactionById(@Req() req: Request) {
    const { id } = req.params;

    const result = await this.handler.execute({ id });

    return { message: 'Success', data: result };
  }
}
