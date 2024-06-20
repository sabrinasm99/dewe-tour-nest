import { STATUS } from 'src/transactions/domain/transaction.domain';
import { CustomerDTOResponseSchema } from 'src/shared/dto/customer.dto.response';
import { TripDTOResponseSchema } from 'src/shared/dto/trip.dto.response';
import { z } from 'zod';

export const FindTransactionByIdDTOResponseSchema = z.object({
  id: z.string().uuid(),
  customer: CustomerDTOResponseSchema,
  quantity: z.number().int().nonnegative(),
  total_payment: z.number().int().nonnegative(),
  status: z.nativeEnum(STATUS),
  attachment: z.string().nullable(),
  trip: TripDTOResponseSchema,
  booking_date: z.date(),
});

export type FindTransactionByIdDTOResponse = z.infer<
  typeof FindTransactionByIdDTOResponseSchema
>;
