import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  ListTransactionByCustomerDTOResponse,
  ListTransactionByCustomerDTOResponseSchema,
} from './list-transaction-by-customer.dto.response';
import {
  ListTransactionByCustomerDTORequest,
  ListTransactionByCustomerDTORequestSchema,
} from './list-transaction-by-customer.dto.request';
import { Injectable } from '@nestjs/common';

export interface ListTransactionByCustomerHandler {
  execute(
    params: ListTransactionByCustomerDTORequest,
  ): Promise<ListTransactionByCustomerDTOResponse>;
}

@Injectable()
export class ListTransactionByCustomerHandlerImpl
  implements ListTransactionByCustomerHandler
{
  constructor(private client: PgConnection) {}

  async execute(params: ListTransactionByCustomerDTORequest) {
    params = ListTransactionByCustomerDTORequestSchema.parse(params);

    const response = await this.client.query(
      "SELECT transactions.id, json_build_object('id', customers.id, 'name', customers.name, 'email', customers.email, 'phone', customers.phone, 'address', customers.address, 'is_admin', customers.is_admin, 'gender', customers.gender, 'image', customers.image, 'created_at', customers.created_at, 'updated_at', customers.updated_at) AS customer, transactions.quantity, transactions.total_payment, transactions.status, transactions.attachment, json_build_object('id', trips.id, 'title', trips.title, 'country', row_to_json(countries), 'quota', trips.quota, 'booked_slots', trips.booked_slots, 'accomodation', trips.accomodation, 'transportation', trips.transportation, 'eat', trips.eat, 'days', trips.days, 'nights', trips.nights, 'date', trips.date, 'price', trips.price, 'description', trips.description, 'cover_image', trips.cover_image, 'detailed_images', trips.detailed_images, 'created_at', trips.created_at, 'updated_at', trips.updated_at) AS trip, transactions.booking_date, transactions.created_at, transactions.updated_at FROM transactions INNER JOIN customers ON transactions.customer_id = customers.id INNER JOIN trips ON transactions.trip_id = trips.id INNER JOIN countries ON trips.country_id = countries.id WHERE transactions.customer_id = $1 ORDER BY transactions.created_at DESC",
      [params.customer_id],
    );

    const transformed =
      await ListTransactionByCustomerDTOResponseSchema.parseAsync(
        response.rows,
      );

    return transformed;
  }
}
