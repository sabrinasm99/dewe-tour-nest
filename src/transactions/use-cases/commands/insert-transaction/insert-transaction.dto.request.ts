import { z } from 'zod';

export const InsertTransactionDTORequestSchema = z.object({
  id: z.string().uuid(),
  customer_id: z.string().uuid(),
  quantity: z.number().int().nonnegative(),
  total_payment: z.number().int().nonnegative(),
  status: z.enum(['approved', 'waiting approve', 'waiting payment']),
  attachment: z.string().nullable(),
  trip_id: z.string().uuid(),
  booking_date: z.date(),
});

export type InsertTransactionDTORequest = z.infer<
  typeof InsertTransactionDTORequestSchema
>;
