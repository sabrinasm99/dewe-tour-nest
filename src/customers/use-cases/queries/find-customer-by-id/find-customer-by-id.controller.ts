import { Controller, Get, Inject, Req } from '@nestjs/common';
import { FindCustomerByIdHandler } from './find-customer-by-id.handler';
import { Request } from 'express';
import { FIND_CUSTOMER_BY_ID_HANDLER } from 'src/customers/customer.constants';

@Controller()
export class FindCustomerByIdController {
  constructor(
    @Inject(FIND_CUSTOMER_BY_ID_HANDLER)
    private handler: FindCustomerByIdHandler,
  ) {}

  @Get('/customers/:id')
  async findCustomerById(@Req() req: Request) {
    const { id } = req.params;

    const result = await this.handler.execute({ id });

    return { message: 'Success', data: result };
  }
}
