import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  ListTransactionDTOResponse,
  ListTransactionDTOResponseSchema,
} from './list-transaction.dto.response';
import { Injectable } from '@nestjs/common';

export interface ListTransactionHandler {
  execute(): Promise<ListTransactionDTOResponse>;
}

@Injectable()
export class ListTransactionHandlerImpl implements ListTransactionHandler {
  constructor(private client: PgConnection) {}

  async execute() {
    const response = await this.client.query('SELECT * FROM transactions');

    const transformed = await ListTransactionDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
