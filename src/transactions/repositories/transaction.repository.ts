import { Transaction } from '../domain/transaction.domain';

export interface TransactionRepository {
  insert(transaction: Transaction): Promise<void>;
}
