import { GENDER } from 'src/customers/domain/customer.domain';
import { z } from 'zod';

export const CustomerDTOResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean(),
  gender: z.nativeEnum(GENDER),
  image: z.string().nullable(),
  created_at: z.string().transform((val) => new Date(val)),
  updated_at: z.string().transform((val) => new Date(val)),
});
