import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  ListCustomerDTOResponse,
  ListCustomerDTOResponseSchema,
} from './list-customer.dto.response';
import { Injectable } from '@nestjs/common';

export interface ListCustomerHandler {
  execute(): Promise<ListCustomerDTOResponse>;
}

@Injectable()
export class ListCustomerHandlerImpl implements ListCustomerHandler {
  constructor(private client: PgConnection) {}

  async execute() {
    const response = await this.client.query(
      'SELECT id, name, email, phone, address, is_admin, gender, image, created_at, updated_at FROM customers',
    );

    const transformed = await ListCustomerDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
