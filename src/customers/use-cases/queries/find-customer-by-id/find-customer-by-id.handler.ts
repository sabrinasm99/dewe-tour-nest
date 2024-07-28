import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  FindCustomerByIdDTORequest,
  FindCustomerByIdDTORequestSchema,
} from './find-customer-by-id.dto.request.schema';
import {
  FindCustomerByIdDTOResponse,
  FindCustomerByIdDTOResponseSchema,
} from './find-customer-by-id.dto.response';
import { Injectable } from '@nestjs/common';

export interface FindCustomerByIdHandler {
  execute(
    params: FindCustomerByIdDTORequest,
  ): Promise<FindCustomerByIdDTOResponse>;
}

@Injectable()
export class FindCustomerByIdHandlerImpl implements FindCustomerByIdHandler {
  constructor(private client: PgConnection) {}

  async execute(params: FindCustomerByIdDTORequest) {
    params = FindCustomerByIdDTORequestSchema.parse(params);

    const response = await this.client.query(
      'SELECT id, name, email, phone, address, is_admin, gender, image, created_at, updated_at FROM customers WHERE id = $1',
      [params.id],
    );

    const transformed = await FindCustomerByIdDTOResponseSchema.parseAsync(
      response.rows[0],
    );

    return transformed;
  }
}
