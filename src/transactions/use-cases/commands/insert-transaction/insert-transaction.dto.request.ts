import { STATUS } from 'src/transactions/domain/transaction.domain';
import { z } from 'zod';

export const InsertTransactionDTORequestSchema = z.object({
  customer_id: z.string().uuid(),
  quantity: z.number().int().nonnegative(),
  total_payment: z.number().int().nonnegative(),
  trip_id: z.string().uuid(),
});

export type InsertTransactionDTORequest = z.infer<
  typeof InsertTransactionDTORequestSchema
>;
