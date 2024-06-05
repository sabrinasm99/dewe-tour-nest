import { z } from 'zod';

export const UpdateCustomerDTORequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  is_admin: z.boolean().optional(),
  gender: z.enum(['male', 'female']).optional(),
  image: z.string().optional(),
});

export type UpdateCustomerDTORequest = z.infer<
  typeof UpdateCustomerDTORequestSchema
>;
