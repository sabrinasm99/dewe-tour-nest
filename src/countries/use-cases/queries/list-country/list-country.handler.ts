import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  ListCountryDTOResponse,
  ListCountryDTOResponseSchema,
} from './list-country.dto.response';
import { Injectable } from '@nestjs/common';

export interface ListCountryHandler {
  execute(): Promise<ListCountryDTOResponse>;
}

@Injectable()
export class ListCountryHandlerImpl implements ListCountryHandler {
  constructor(private client: PgConnection) {}
  async execute() {
    const response = await this.client.query(
      'SELECT * FROM countries ORDER BY created_at ASC',
    );

    const transformed = await ListCountryDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
