import { PgConnection } from 'src/connections/database/pg.connection.service';
import { TransactionRepository } from '../transaction.repository';
import { Transaction } from 'src/transactions/domain/transaction.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionPgRepository implements TransactionRepository {
  constructor(private client: PgConnection) {}

  async insert(transaction: Transaction): Promise<Transaction> {
    const props = transaction.getProps();

    const text =
      'INSERT INTO transactions(customer_id, quantity, total_payment, status, attachment, trip_id, booking_date, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

    const values = [
      props.customer_id,
      props.quantity,
      props.total_payment,
      props.status,
      props.attachment,
      props.trip_id,
      props.booking_date,
      props.created_at,
      props.updated_at,
    ];

    const result = await this.client.query(text, values);

    const row = result.rows[0];

    return Transaction.create({ ...row });
  }

  async findById(id: number): Promise<Transaction> {
    const text = 'SELECT * FROM transactions WHERE id = $1';
    const value = [id];

    const result = await this.client.query(text, value);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return Transaction.create({ ...row });
  }

  async update(transaction: Transaction) {
    const props = transaction.getProps();

    const text =
      'UPDATE transactions SET customer_id = $1, quantity = $2, status = $3, total_payment = $4, attachment = $5, trip_id = $6, booking_date = $7, updated_at = $8 WHERE id = $9';
    const values = [
      props.customer_id,
      props.quantity,
      props.status,
      props.total_payment,
      props.attachment,
      props.trip_id,
      props.booking_date,
      props.updated_at,
      props.id,
    ];

    await this.client.query(text, values);
  }

  async delete(id: number): Promise<void> {
    const text = 'DELETE FROM transactions WHERE id = $1';
    const value = [id];

    await this.client.query(text, value);
  }
}
