import { PgConnection } from 'src/connections/database/pg.connection.service';
import {
  ListTransactionDTOResponse,
  ListTransactionDTOResponseSchema,
} from './list-transaction.dto.response';
import { Injectable } from '@nestjs/common';

export interface ListTransactionHandler {
  execute(): Promise<ListTransactionDTOResponse>;
}

@Injectable()
export class ListTransactionHandlerImpl implements ListTransactionHandler {
  constructor(private client: PgConnection) {}

  async execute() {
    const response = await this.client.query(
      "SELECT transactions.id, row_to_json(customers) AS customer, transactions.quantity, transactions.total_payment, transactions.status, transactions.attachment, json_build_object('id', trips.id, 'title', trips.title, 'country', row_to_json(countries), 'quota', trips.quota, 'booked_slots', trips.booked_slots, 'accomodation', trips.accomodation, 'eat', trips.eat, 'days', trips.days, 'nights', trips.nights, 'date', trips.date, 'price', trips.price, 'description', trips.description, 'image', trips.image) AS trip, transactions.booking_date FROM transactions INNER JOIN customers ON transactions.customer_id = customers.id INNER JOIN trips ON transactions.trip_id = trips.id INNER JOIN countries ON trips.country_id = countries.id",
    );

    const transformed = await ListTransactionDTOResponseSchema.parseAsync(
      response.rows,
    );

    return transformed;
  }
}
