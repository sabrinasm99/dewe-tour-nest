import { Customer } from 'src/customers/domain/customer.domain';
import {
  InsertCustomerDTORequest,
  InsertCustomerDTORequestSchema,
} from './insert-customer.dto.request';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  saltRounds,
} from 'src/customers/customer.constants';
import { hash } from 'bcrypt';

export interface InsertCustomerHandler {
  execute(params: InsertCustomerDTORequest): Promise<Customer>;
}

@Injectable()
export class InsertCustomerHandlerImpl implements InsertCustomerHandler {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepo: CustomerRepository,
  ) {}

  async execute(params: InsertCustomerDTORequest) {
    params = InsertCustomerDTORequestSchema.parse(params);

    const id = v4();

    const hashedPass = await hash(params.password, saltRounds);

    const customer = Customer.create({
      id,
      name: params.name,
      email: params.email,
      password: hashedPass,
      phone: params.phone,
      address: params.address,
      gender: params.gender,
    });

    await this.customerRepo.insert(customer);

    return customer;
  }
}
