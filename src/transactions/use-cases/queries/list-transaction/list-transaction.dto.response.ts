import { STATUS } from 'src/transactions/domain/transaction.domain';
import { CustomerDTOResponseSchema } from 'src/shared/dto/customer.dto.response';
import { TripDTOResponseSchema } from 'src/shared/dto/trip.dto.response';
import { z } from 'zod';

export const ListTransactionDTOResponseSchema = z.array(
  z.object({
    id: z.number(),
    customer: CustomerDTOResponseSchema,
    quantity: z.number().int().nonnegative(),
    total_payment: z.number().int().nonnegative(),
    status: z.nativeEnum(STATUS),
    attachment: z.string().nullable(),
    trip: TripDTOResponseSchema,
    booking_date: z.date().transform((val) => {
      const newDate = new Date(val);
      const day = newDate.toLocaleDateString('en-US', { weekday: 'long' });
      const date = newDate.getDate();
      const month = newDate.toLocaleString('default', { month: 'long' });
      const year = newDate.getFullYear();
      return `${day}, ${date} ${month} ${year}`;
    }),
    created_at: z.date(),
    updated_at: z.date(),
  }),
);

export type ListTransactionDTOResponse = z.infer<
  typeof ListTransactionDTOResponseSchema
>;
