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
      'SELECT trips.id, trips.title, row_to_json(countries) AS country, trips.quota, trips.booked_slots, trips.accomodation, trips.transportation, trips.eat, trips.days, trips.nights, trips.date, trips.price, trips.description, trips.image FROM trips INNER JOIN countries ON trips.country_id = countries.id WHERE trips.id = $1',
      [params.id],
    );

    const transformed = await FindTripByIdDTOResponseSchema.parseAsync(
      response.rows[0],
    );

    return transformed;
  }
}
