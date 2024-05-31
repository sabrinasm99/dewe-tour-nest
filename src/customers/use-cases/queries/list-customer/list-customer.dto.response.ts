import { z } from 'zod';

export const ListCustomerDTOResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    is_admin: z.boolean(),
    gender: z.enum(['male', 'female']),
    image: z.string().nullable(),
  }),
);

export type ListCustomerDTOResponse = z.infer<
  typeof ListCustomerDTOResponseSchema
>;
