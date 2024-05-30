import { PgConnection } from 'src/connections/database/pg.connection.service';
import { TransactionRepository } from '../transaction.repository';
import { Transaction } from 'src/transactions/domain/transaction.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionPgRepository implements TransactionRepository {
  constructor(private client: PgConnection) {}

  async insert(transaction: Transaction): Promise<void> {
    const props = transaction.getProps();

    const text =
      'INSERT INTO transactions(id, customer_id, quantity, total_payment, status, attachment, trip_id, booking_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    const values = [
      props.id,
      props.customer_id,
      props.quantity,
      props.total_payment,
      props.status,
      props.attachment,
      props.trip_id,
      props.booking_date,
    ];

    await this.client.query(text, values);
  }
}
