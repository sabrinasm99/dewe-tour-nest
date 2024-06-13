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

  async findById(id: string): Promise<Transaction> {
    const text = 'SELECT * FROM transactions WHERE id = $1';
    const value = [id];

    const result = await this.client.query(text, value);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return Transaction.create({
      id: row.id,
      customer_id: row.customer_id,
      quantity: row.quantity,
      status: row.status,
      total_payment: row.total_payment,
      attachment: row.attachment,
      trip_id: row.trip_id,
      booking_date: row.booking_date,
    });
  }

  async update(transaction: Transaction) {
    const props = transaction.getProps();

    const text =
      'UPDATE transactions SET customer_id = $1, quantity = $2, status = $3, total_payment = $4, attachment = $5, trip_id = $6, booking_date = $7 WHERE id = $8';
    const values = [
      props.customer_id,
      props.quantity,
      props.status,
      props.total_payment,
      props.attachment,
      props.trip_id,
      props.booking_date,
      props.id,
    ];

    await this.client.query(text, values);
  }

  async delete(id: string): Promise<void> {
    const text = 'DELETE FROM transactions WHERE id = $1';
    const value = [id];

    await this.client.query(text, value);
  }
}
