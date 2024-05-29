import { z } from 'zod';

export const DeleteCustomerDTORequestSchema = z.string().uuid();

export type DeleteCustomerDTORequest = z.infer<
  typeof DeleteCustomerDTORequestSchema
>;
