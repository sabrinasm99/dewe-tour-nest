import { Controller, Inject, Post, Req } from '@nestjs/common';
import { InsertCustomerHandler } from './insert-customer.handler';
import { INSERT_CUSTOMER_HANDLER } from 'src/customers/customer.constants';
import { Request } from 'express';

@Controller()
export class InsertCustomerController {
  constructor(
    @Inject(INSERT_CUSTOMER_HANDLER) private handler: InsertCustomerHandler,
  ) {}

  @Post('/register')
  async insert(@Req() req: Request) {
    const body = req.body;

    const { id, token, isAdmin } = await this.handler.execute({ ...body });

    return { message: 'Success', data: { id, token, isAdmin } };
  }
}
