import { z } from 'zod';

export const FindTripByIdDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type FindTripByIdDTORequest = z.infer<
  typeof FindTripByIdDTORequestSchema
>;
