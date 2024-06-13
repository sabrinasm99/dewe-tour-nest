import { z } from 'zod';

export const DeleteTransactionDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteTransactionDTORequest = z.infer<
  typeof DeleteTransactionDTORequestSchema
>;
