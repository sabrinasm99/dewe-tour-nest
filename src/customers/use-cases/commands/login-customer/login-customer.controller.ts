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

    const { id, token } = await this.handler.execute({ ...body });

    return { message: 'Success', data: { id, token } };
  }
}
