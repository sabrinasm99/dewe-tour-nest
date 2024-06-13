import { Transaction } from '../domain/transaction.domain';

export interface TransactionRepository {
  insert(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  delete(id: string): Promise<void>;
}
