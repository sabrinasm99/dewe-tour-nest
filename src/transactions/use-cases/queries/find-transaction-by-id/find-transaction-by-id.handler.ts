import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  FindTransactionByIdDTORequest,
  FindTransactionByIdDTORequestSchema,
} from './find-transaction-by-id.dto.request';
import {
  FindTransactionByIdDTOResponse,
  FindTransactionByIdDTOResponseSchema,
} from './find-transaction-by-id.dto.response';
import { Injectable } from '@nestjs/common';

export interface FindTransactionByIdHandler {
  execute(
    params: FindTransactionByIdDTORequest,
  ): Promise<FindTransactionByIdDTOResponse>;
}

@Injectable()
export class FindTransactionByIdHandlerImpl
  implements FindTransactionByIdHandler
{
  constructor(private client: PgConnection) {}

  async execute(params: FindTransactionByIdDTORequest) {
    params = FindTransactionByIdDTORequestSchema.parse(params);

    const response = await this.client.query(
      'SELECT * FROM transactions WHERE id = $1',
      [params.id],
    );

    const transformed = await FindTransactionByIdDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
