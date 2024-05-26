import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  ListTripDTOResponse,
  ListTripDTOResponseSchema,
} from './list-trip.dto.response';
import { Injectable } from '@nestjs/common';

export interface ListTripHandler {
  execute(): Promise<ListTripDTOResponse>;
}

@Injectable()
export class ListTripHandlerImpl implements ListTripHandler {
  constructor(private client: PgConnection) {}
  async execute() {
    const response = await this.client.query('SELECT * FROM trips');

    const transformed = await ListTripDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
