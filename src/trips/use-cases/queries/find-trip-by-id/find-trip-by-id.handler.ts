import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  FindTripByIdDTORequest,
  FindTripByIdDTORequestSchema,
} from './find-trip-by-id.dto.request';
import {
  FindTripByIdDTOResponse,
  FindTripByIdDTOResponseSchema,
} from './find-trip-by-id.dto.response';
import { Injectable } from '@nestjs/common';

export interface FindTripByIdHandler {
  execute(params: FindTripByIdDTORequest): Promise<FindTripByIdDTOResponse>;
}

@Injectable()
export class FindTripByIdHandlerImpl implements FindTripByIdHandler {
  constructor(private client: PgConnection) {}

  async execute(params: FindTripByIdDTORequest) {
    params = FindTripByIdDTORequestSchema.parse(params);

    const response = await this.client.query(
      'SELECT * FROM trips WHERE id = $1',
      [params.id],
    );

    const transformed = await FindTripByIdDTOResponseSchema.parseAsync(
      response.rows[0],
    );

    return transformed;
  }
}
