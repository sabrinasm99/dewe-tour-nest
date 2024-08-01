import { Transaction } from '../domain/transaction.domain';

export interface TransactionRepository {
  insert(transaction: Transaction): Promise<Transaction>;
  update(transaction: Transaction): Promise<void>;
  findById(id: number): Promise<Transaction | null>;
  delete(id: number): Promise<void>;
}
