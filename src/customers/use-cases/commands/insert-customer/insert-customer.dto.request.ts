import { z } from 'zod';

export const InsertCustomerDTORequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean().optional(),
  gender: z.enum(['male', 'female']),
  image: z.string().optional(),
});

export type InsertCustomerDTORequest = z.infer<
  typeof InsertCustomerDTORequestSchema
>;
