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
    const response = await this.client.query('SELECT * FROM customers');

    const transformed = await ListCustomerDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
