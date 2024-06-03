import { Customer } from 'src/customers/domain/customer.domain';
import {
  UpdateCustomerDTORequest,
  UpdateCustomerDTORequestSchema,
} from './update-customer.dto.request';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/customers/customer.constants';

export interface UpdateCustomerHandler {
  execute(params: UpdateCustomerDTORequest): Promise<Customer>;
}

@Injectable()
export class UpdateCustomerHandlerImpl implements UpdateCustomerHandler {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepo: CustomerRepository,
  ) {}

  async execute(params: UpdateCustomerDTORequest) {
    params = UpdateCustomerDTORequestSchema.parse(params);

    const customer = await this.customerRepo.findById(params.id);

    if (!customer) {
      throw new Error('Customer is not found');
    }

    if (params.name) {
      customer.updateName(params.name);
    }

    if (params.email) {
      customer.updateEmail(params.email);
    }

    if (params.phone) {
      customer.updatePhone(params.phone);
    }

    if (params.address) {
      customer.updateAddress(params.address);
    }

    if (params.is_admin !== undefined) {
      customer.updateIsAdmin(params.is_admin);
    }

    if (params.gender) {
      customer.updateGender(params.gender);
    }

    if (params.image) {
      customer.updateImage(params.image);
    }

    await this.customerRepo.update(customer);

    return customer;
  }
}
