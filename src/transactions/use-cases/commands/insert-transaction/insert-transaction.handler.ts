import {
  STATUS,
  Transaction,
} from 'src/transactions/domain/transaction.domain';
import {
  InsertTransactionDTORequest,
  InsertTransactionDTORequestSchema,
} from './insert-transaction.dto.request';
import { TransactionRepository } from 'src/transactions/repositories/transaction.repository';
import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/transactions/transaction.constants';
import { TripRepository } from 'src/trips/repositories/trip.repository';
import { TRIP_REPOSITORY } from 'src/trips/trip.constants';

export interface InsertTransactionHandler {
  execute(params: InsertTransactionDTORequest): Promise<Transaction>;
}

@Injectable()
export class InsertTransactionHandlerImpl implements InsertTransactionHandler {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: TransactionRepository,
    @Inject(TRIP_REPOSITORY) private tripPgRepository: TripRepository,
  ) {}

  async execute(params: InsertTransactionDTORequest) {
    params = InsertTransactionDTORequestSchema.parse(params);

    const trip = await this.tripPgRepository.findById(params.trip_id);

    if (!trip) {
      throw new Error('Trip is not found');
    }

    const { booked_slots, quota } = trip.getProps();

    if (booked_slots + params.quantity > quota) {
      throw new Error('Your order quantity exceeds the available quota');
    }

    const id = v4();

    const transaction = Transaction.create({
      id,
      customer_id: params.customer_id,
      quantity: params.quantity,
      total_payment: params.total_payment,
      status: STATUS.WAITING_PAYMENT,
      attachment: null,
      trip_id: params.trip_id,
      booking_date: new Date(),
    });

    await this.transactionRepo.insert(transaction);

    return transaction;
  }
}
