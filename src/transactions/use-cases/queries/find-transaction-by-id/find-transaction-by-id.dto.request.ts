import { z } from 'zod';

export const FindTransactionByIdDTORequestSchema = z.object({
  id: z.number(),
});

export type FindTransactionByIdDTORequest = z.infer<
  typeof FindTransactionByIdDTORequestSchema
>;
