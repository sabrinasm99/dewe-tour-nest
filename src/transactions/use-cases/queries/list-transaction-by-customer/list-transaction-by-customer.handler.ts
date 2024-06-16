import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  ListTransactionByCustomerDTOResponse,
  ListTransactionByCustomerDTOResponseSchema,
} from './list-transaction-by-customer.dto.response';
import {
  ListTransactionByCustomerDTORequest,
  ListTransactionByCustomerDTORequestSchema,
} from './list-transaction-by-customer.dto.request';
import { Injectable } from '@nestjs/common';

export interface ListTransactionByCustomerHandler {
  execute(
    params: ListTransactionByCustomerDTORequest,
  ): Promise<ListTransactionByCustomerDTOResponse>;
}

@Injectable()
export class ListTransactionByCustomerHandlerImpl
  implements ListTransactionByCustomerHandler
{
  constructor(private client: PgConnection) {}

  async execute(params: ListTransactionByCustomerDTORequest) {
    params = ListTransactionByCustomerDTORequestSchema.parse(params);

    const response = await this.client.query(
      'SELECT * FROM transactions WHERE customer_id = $1',
      [params.customer_id],
    );

    const transformed =
      await ListTransactionByCustomerDTOResponseSchema.parseAsync(
        response.rows,
      );

    return transformed;
  }
}
