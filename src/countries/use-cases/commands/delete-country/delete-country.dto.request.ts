import { z } from 'zod';

export const DeleteCountryDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteCountryDTORequest = z.infer<
  typeof DeleteCountryDTORequestSchema
>;
