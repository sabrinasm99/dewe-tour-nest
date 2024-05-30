import { Transaction } from 'src/transactions/domain/transaction.domain';
import {
  InsertTransactionDTORequest,
  InsertTransactionDTORequestSchema,
} from './insert-transaction.dto.request';
import { TransactionRepository } from 'src/transactions/repositories/transaction.repository';
import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/transactions/transaction.constants';

export interface InsertTransactionHandler {
  execute(params: InsertTransactionDTORequest): Promise<Transaction>;
}

@Injectable()
export class InsertTransactionHandlerImpl implements InsertTransactionHandler {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: TransactionRepository,
  ) {}

  async execute(params: InsertTransactionDTORequest) {
    params = InsertTransactionDTORequestSchema.parse(params);

    const id = v4();

    const transaction = Transaction.create({
      id,
      customer_id: params.customer_id,
      quantity: params.quantity,
      total_payment: params.total_payment,
      status: 'waiting payment',
      attachment: null,
      trip_id: params.trip_id,
      booking_date: params.booking_date,
    });

    await this.transactionRepo.insert(transaction);

    return transaction;
  }
}
