import { z } from 'zod';

export const DeleteCustomerDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteCustomerDTORequest = z.infer<
  typeof DeleteCustomerDTORequestSchema
>;
