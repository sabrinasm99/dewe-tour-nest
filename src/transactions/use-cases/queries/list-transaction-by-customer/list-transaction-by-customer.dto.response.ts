import { CustomerDTOResponseSchema } from 'src/shared/dto/customer.dto.response';
import { TripDTOResponseSchema } from 'src/shared/dto/trip.dto.response';
import { STATUS } from 'src/transactions/domain/transaction.domain';
import { z } from 'zod';

export const ListTransactionByCustomerDTOResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    customer: CustomerDTOResponseSchema,
    quantity: z.number().int().nonnegative(),
    total_payment: z.number().int().nonnegative(),
    status: z.nativeEnum(STATUS),
    attachment: z.string().nullable(),
    trip: TripDTOResponseSchema,
    booking_date: z.date(),
  }),
);

export type ListTransactionByCustomerDTOResponse = z.infer<
  typeof ListTransactionByCustomerDTOResponseSchema
>;
