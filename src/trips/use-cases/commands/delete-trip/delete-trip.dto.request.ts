import { z } from 'zod';

export const DeleteTripDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteTripDTORequest = z.infer<typeof DeleteTripDTORequestSchema>;
