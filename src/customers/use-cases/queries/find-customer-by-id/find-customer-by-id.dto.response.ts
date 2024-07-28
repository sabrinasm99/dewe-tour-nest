import { GENDER } from 'src/customers/domain/customer.domain';
import { z } from 'zod';

export const FindCustomerByIdDTOResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean(),
  gender: z.nativeEnum(GENDER),
  image: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type FindCustomerByIdDTOResponse = z.infer<
  typeof FindCustomerByIdDTOResponseSchema
>;
