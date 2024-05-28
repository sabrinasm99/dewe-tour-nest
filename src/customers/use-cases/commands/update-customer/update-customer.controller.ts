import { Controller, Inject, Put, Req } from '@nestjs/common';
import { UpdateCustomerHandler } from './update-customer.handler';
import { UPDATE_CUSTOMER_HANDLER } from 'src/customers/customer.constants';
import { Request } from 'express';

@Controller()
export class UpdateCustomerController {
  constructor(
    @Inject(UPDATE_CUSTOMER_HANDLER) private handler: UpdateCustomerHandler,
  ) {}

  @Put('/customers/:id')
  async update(@Req() req: Request) {
    const params = req.body;
    const { id } = req.params;

    await this.handler.execute({ id, ...params });

    return { message: 'Success', data: { id } };
  }
}
