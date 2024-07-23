import { Injectable } from '@nestjs/common';
import { PgConnection } from 'src/connections/database/pg.connection.service';
import { TransactionPgRepository } from 'src/transactions/repositories/implementations/transaction.pg.impl.repository';
import { TripPgRepository } from 'src/trips/repositories/implementations/trip.pg.impl.repository';

@Injectable()
export class UnitOfWorkTransactionTrip {
  constructor(private client: PgConnection) {}

  async start() {
    await this.client.query('BEGIN');

    const tripPgRepository = new TripPgRepository(this.client);

    const transactionPgRepository = new TransactionPgRepository(this.client);

    const commit = async () => {
      await this.client.query('COMMIT');
    };

    const rollback = async () => {
      await this.client.query('ROLLBACK');
    };

    const release = async () => {
      (await this.client.connect()).release();
    };

    return {
      commit,
      rollback,
      release,
      tripPgRepository,
      transactionPgRepository,
    };
  }
}
