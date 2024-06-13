import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/customers/customer.constants';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import {
  DeleteCustomerDTORequest,
  DeleteCustomerDTORequestSchema,
} from './delete-customer.dto.request';
import { unlink } from 'fs/promises';

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

    const { image } = customer.getProps();

    let filePath;
    if (image) {
      filePath = `./images/customer-avatar/${image}`;
    }

    await this.customerRepo.delete(params.id);

    if (filePath) {
      await unlink(filePath);
    }
  }
}
