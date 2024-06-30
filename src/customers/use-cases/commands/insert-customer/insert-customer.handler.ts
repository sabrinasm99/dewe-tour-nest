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
import { sign } from 'jsonwebtoken';

type RegisterResultProps = {
  id: string;
  token: string;
  isAdmin: boolean;
};

export interface InsertCustomerHandler {
  execute(params: InsertCustomerDTORequest): Promise<RegisterResultProps>;
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

    const isAdmin =
      params.is_admin && params.is_admin === true ? params.is_admin : false;

    const customer = Customer.create({
      id,
      name: params.name,
      email: params.email,
      password: hashedPass,
      phone: params.phone,
      address: params.address,
      is_admin: isAdmin,
      gender: params.gender,
    });

    await this.customerRepo.insert(customer);

    const token = sign({ id, isAdmin }, process.env.JWT_PASS);

    return { id, token, isAdmin };
  }
}
