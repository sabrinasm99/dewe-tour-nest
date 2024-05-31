import { STATUS } from 'src/transactions/domain/transaction.domain';
import { z } from 'zod';

export const ListTransactionDTOResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    customer_id: z.string().uuid(),
    quantity: z.number().int().nonnegative(),
    total_payment: z.number().int().nonnegative(),
    status: z.nativeEnum(STATUS),
    attachment: z.string().nullable(),
    trip_id: z.string().uuid(),
    booking_date: z.date(),
  }),
);

export type ListTransactionDTOResponse = z.infer<
  typeof ListTransactionDTOResponseSchema
>;
