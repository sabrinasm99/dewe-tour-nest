import { z } from 'zod';

export const FindCustomerByIdDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type FindCustomerByIdDTORequest = z.infer<
  typeof FindCustomerByIdDTORequestSchema
>;
