import { Controller, Inject, Post, Req } from '@nestjs/common';
import { InsertCustomerHandler } from './insert-customer.handler';
import { INSERT_CUSTOMER_HANDLER } from 'src/customers/customer.constants';
import { Request } from 'express';

@Controller()
export class InsertCustomerController {
  constructor(
    @Inject(INSERT_CUSTOMER_HANDLER) private handler: InsertCustomerHandler,
  ) {}

  @Post('/customers')
  async insert(@Req() req: Request) {
    const params = req.body;

    const customer = await this.handler.execute(params);

    const { id } = customer.getProps();

    return { message: 'Success', data: { id } };
  }
}
