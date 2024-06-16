import { z } from 'zod';

export const ListTransactionByCustomerDTORequestSchema = z.object({
  customer_id: z.string().uuid(),
});

export type ListTransactionByCustomerDTORequest = z.infer<
  typeof ListTransactionByCustomerDTORequestSchema
>;
