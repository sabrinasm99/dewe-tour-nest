import { z } from 'zod';

export const FindTransactionByIdDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type FindTransactionByIdDTORequest = z.infer<
  typeof FindTransactionByIdDTORequestSchema
>;
