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
    const response = await this.client.query(
      'SELECT trips.id, trips.title, countries.name AS country, trips.quota, trips.booked_slots, trips.accomodation, trips.eat, trips.days, trips.nights, trips.date, trips.price, trips.description, trips.image FROM trips INNER JOIN countries ON trips.country_id = countries.id',
    );

    const transformed = await ListTripDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
