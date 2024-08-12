import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import {
  LoginCustomerDTORequest,
  LoginCustomerDTORequestSchema,
} from './login-customer.dto.request';
import { compare } from 'bcryptjs';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/customers/customer.constants';
import { sign } from 'jsonwebtoken';

export type LoginResultProps = {
  id: string;
  token: string;
  isAdmin: boolean;
};
export interface LoginCustomerHandler {
  execute(params: LoginCustomerDTORequest): Promise<LoginResultProps>;
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
      throw new NotFoundException('Customer is not found');
    }

    // check password
    const {
      password: savedPass,
      id: customerId,
      is_admin,
    } = customer.getProps();
    const validatedPass = await compare(params.password, savedPass);

    if (!validatedPass) {
      throw new UnauthorizedException('Email or password invalid');
    }

    const token = sign(
      { id: customerId, isAdmin: is_admin },
      process.env.JWT_PASS,
    );

    return { id: customerId, token, isAdmin: is_admin };
  }
}
