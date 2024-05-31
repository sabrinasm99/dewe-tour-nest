import { Controller, Delete, Inject, Req } from '@nestjs/common';
import { DeleteCustomerHandler } from './delete-customer.handler';
import { Request } from 'express';
import { DELETE_CUSTOMER_HANDLER } from 'src/customers/customer.constants';

@Controller()
export class DeleteCustomerController {
  constructor(
    @Inject(DELETE_CUSTOMER_HANDLER) private handler: DeleteCustomerHandler,
  ) {}

  @Delete('/customers/:id')
  async delete(@Req() req: Request) {
    const { id } = req.params;

    await this.handler.execute({ id });

    return { message: 'Success', data: { id } };
  }
}
