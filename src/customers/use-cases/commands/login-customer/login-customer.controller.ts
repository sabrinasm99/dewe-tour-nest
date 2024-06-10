import { Controller, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { LoginCustomerHandler } from './login-customer.handler';
import { Request, Response } from 'express';
import { LOGIN_CUSTOMER_HANDLER } from 'src/customers/customer.constants';

@Controller()
export class LoginCustomerController {
  constructor(
    @Inject(LOGIN_CUSTOMER_HANDLER) private handler: LoginCustomerHandler,
  ) {}

  @Post('/login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const body = req.body;

    const { id, token } = await this.handler.execute({ ...body });

    res.status(HttpStatus.OK);

    return { message: 'Success', data: { id, token } };
  }
}
