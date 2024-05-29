import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/customers/customer.constants';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import {
  DeleteTripDTORequest,
  DeleteTripDTORequestSchema,
} from 'src/trips/use-cases/commands/delete-trip/delete-trip.dto.request';

export interface DeleteCustomerHandler {
  execute(id: DeleteTripDTORequest): Promise<void>;
}

@Injectable()
export class DeleteCustomerHandlerImpl implements DeleteCustomerHandler {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepo: CustomerRepository,
  ) {}

  async execute(id: DeleteTripDTORequest) {
    id = DeleteTripDTORequestSchema.parse(id);

    const customer = await this.customerRepo.findById(id);

    if (!customer) {
      throw new Error('Customer is not found');
    }

    await this.customerRepo.delete(id);
  }
}
