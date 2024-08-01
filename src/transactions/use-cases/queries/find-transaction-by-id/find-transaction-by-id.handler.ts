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
      "SELECT transactions.id, json_build_object('id', customers.id, 'name', customers.name, 'email', customers.email, 'phone', customers.phone, 'address', customers.address, 'is_admin', customers.is_admin, 'gender', customers.gender, 'image', customers.image, 'created_at', customers.created_at, 'updated_at', customers.updated_at) AS customer, transactions.quantity, transactions.total_payment, transactions.status, transactions.attachment, json_build_object('id', trips.id, 'title', trips.title, 'country', row_to_json(countries), 'quota', trips.quota, 'booked_slots', trips.booked_slots, 'accomodation', trips.accomodation, 'transportation', trips.transportation, 'eat', trips.eat, 'days', trips.days, 'nights', trips.nights, 'date', trips.date, 'price', trips.price, 'description', trips.description, 'cover_image', trips.cover_image, 'detailed_images', trips.detailed_images, 'created_at', trips.created_at, 'updated_at', trips.updated_at) AS trip, transactions.booking_date, transactions.created_at, transactions.updated_at FROM transactions INNER JOIN customers ON transactions.customer_id = customers.id INNER JOIN trips ON transactions.trip_id = trips.id INNER JOIN countries ON trips.country_id = countries.id WHERE transactions.id = $1",
      [params.id],
    );

    const transformed = await FindTransactionByIdDTOResponseSchema.parseAsync(
      response.rows[0],
    );

    return transformed;
  }
}
