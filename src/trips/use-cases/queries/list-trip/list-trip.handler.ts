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
      'SELECT trips.id, trips.title, row_to_json(countries) AS country, trips.quota, trips.booked_slots, trips.accomodation, trips.transportation, trips.eat, trips.days, trips.nights, trips.date, trips.price, trips.description, trips.cover_image, trips.detailed_images, trips.created_at, trips.updated_at FROM trips INNER JOIN countries ON trips.country_id = countries.id ORDER BY trips.date ASC',
    );

    const transformed = await ListTripDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
