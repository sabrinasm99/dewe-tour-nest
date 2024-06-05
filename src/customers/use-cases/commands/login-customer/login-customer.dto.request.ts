import { z } from 'zod';

export const LoginCustomerDTORequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginCustomerDTORequest = z.infer<
  typeof LoginCustomerDTORequestSchema
>;
