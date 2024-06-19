import { GENDER } from 'src/customers/domain/customer.domain';
import { z } from 'zod';

export const InsertCustomerDTORequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean().optional(),
  gender: z.nativeEnum(GENDER),
  image: z.string().optional(),
});

export type InsertCustomerDTORequest = z.infer<
  typeof InsertCustomerDTORequestSchema
>;
