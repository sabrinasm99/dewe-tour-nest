import { GENDER } from 'src/customers/domain/customer.domain';
import { z } from 'zod';

export const CustomerDTOResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean(),
  gender: z.nativeEnum(GENDER),
  image: z.string().nullable(),
});
