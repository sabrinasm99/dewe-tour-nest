import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ListTransactionByCustomerHandler } from './list-transaction-by-customer.handler';
import { Request } from 'express';
import { LIST_TRANSACTION_BY_CUSTOMER_HANDLER } from 'src/transactions/transaction.constants';

@Controller()
export class ListTransactionByCustomerController {
  constructor(
    @Inject(LIST_TRANSACTION_BY_CUSTOMER_HANDLER)
    private handler: ListTransactionByCustomerHandler,
  ) {}

  @Get('/transactions/customers/:customer_id')
  async findByCustomerId(@Req() req: Request) {
    const { customer_id } = req.params;

    const result = await this.handler.execute({ customer_id });

    return { message: 'Success', data: result };
  }
}
