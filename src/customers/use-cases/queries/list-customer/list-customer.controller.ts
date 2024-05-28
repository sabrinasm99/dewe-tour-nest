import { Controller, Get, Inject } from '@nestjs/common';
import { ListCustomerHandler } from './list-customer.handler';
import { LIST_CUSTOMER_HANDLER } from 'src/customers/customer.constants';

@Controller()
export class ListCustomerController {
  constructor(
    @Inject(LIST_CUSTOMER_HANDLER) private handler: ListCustomerHandler,
  ) {}

  @Get('/customers')
  async findAll() {
    const result = await this.handler.execute();

    return { message: 'Success', data: result };
  }
}
