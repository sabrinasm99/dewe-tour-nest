import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/customers/customer.constants';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import {
  DeleteCustomerDTORequest,
  DeleteCustomerDTORequestSchema,
} from './delete-customer.dto.request';

export interface DeleteCustomerHandler {
  execute(params: DeleteCustomerDTORequest): Promise<void>;
}

@Injectable()
export class DeleteCustomerHandlerImpl implements DeleteCustomerHandler {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepo: CustomerRepository,
  ) {}

  async execute(params: DeleteCustomerDTORequest) {
    params = DeleteCustomerDTORequestSchema.parse(params);

    const customer = await this.customerRepo.findById(params.id);

    if (!customer) {
      throw new Error('Customer is not found');
    }

    await this.customerRepo.delete(params.id);
  }
}
