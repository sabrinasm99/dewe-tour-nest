import { z } from 'zod';

export const DeleteTransactionDTORequestSchema = z.object({
  id: z.number(),
});

export type DeleteTransactionDTORequest = z.infer<
  typeof DeleteTransactionDTORequestSchema
>;
