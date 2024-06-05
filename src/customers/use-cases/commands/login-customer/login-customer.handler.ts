import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import {
  LoginCustomerDTORequest,
  LoginCustomerDTORequestSchema,
} from './login-customer.dto.request';
import { Customer } from 'src/customers/domain/customer.domain';
import { compare } from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/customers/customer.constants';

export interface LoginCustomerHandler {
  execute(params: LoginCustomerDTORequest): Promise<Customer>;
}

@Injectable()
export class LoginCustomerHandlerImpl implements LoginCustomerHandler {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepo: CustomerRepository,
  ) {}

  async execute(params: LoginCustomerDTORequest) {
    params = LoginCustomerDTORequestSchema.parse(params);

    const customer = await this.customerRepo.findByEmail(params.email);

    if (!customer) {
      throw new Error('Customer is not found');
    }

    // check password
    const { password: savedPass } = customer.getProps();
    const validatedPass = await compare(params.password, savedPass);

    if (!validatedPass) {
      throw new Error('Email or password invalid');
    }

    return customer;
  }
}
