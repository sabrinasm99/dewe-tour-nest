import { Customer } from 'src/customers/domain/customer.domain';
import {
  UpdateCustomerDTORequest,
  UpdateCustomerDTORequestSchema,
} from './update-customer.dto.request';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  customerImagesDir,
  saltRounds,
} from 'src/customers/customer.constants';
import { hash } from 'bcryptjs';
import { unlink, writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

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
      throw new NotFoundException('Customer is not found');
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

    if (params.password) {
      const hashedPass = await hash(params.password, saltRounds);
      customer.updatePassword(hashedPass);
    }

    let oldPath, newPath;
    const { image } = customer.getProps();

    if (image) {
      oldPath = `${customerImagesDir}/${image}`;
    }

    if (params.image_filename) {
      newPath = `${customerImagesDir}/${params.image_filename}`;
      customer.updateImage(params.image_filename);
    }

    await this.customerRepo.update(customer);

    if (!existsSync(customerImagesDir)) {
      mkdirSync(customerImagesDir);
    }

    if (oldPath && newPath) {
      await unlink(oldPath);
      await writeFile(newPath, params.image_buffer);
    }

    if (!oldPath && newPath) {
      await writeFile(newPath, params.image_buffer);
    }

    return customer;
  }
}
