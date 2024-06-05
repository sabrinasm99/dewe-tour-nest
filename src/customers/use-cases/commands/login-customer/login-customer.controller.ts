import { Controller, Inject, Post, Req } from '@nestjs/common';
import { LoginCustomerHandler } from './login-customer.handler';
import { Request } from 'express';
import { LOGIN_CUSTOMER_HANDLER } from 'src/customers/customer.constants';

@Controller()
export class LoginCustomerController {
  constructor(
    @Inject(LOGIN_CUSTOMER_HANDLER) private handler: LoginCustomerHandler,
  ) {}

  @Post('/login')
  async login(@Req() req: Request) {
    const body = req.body;

    const result = await this.handler.execute({ ...body });

    const { id } = result.getProps();

    return { message: 'Success', data: { id } };
  }
}
