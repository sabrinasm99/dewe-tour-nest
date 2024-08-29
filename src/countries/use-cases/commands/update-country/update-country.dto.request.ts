import { z } from 'zod';

export const UpdateCountryDTORequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type UpdateCountryDTORequest = z.infer<
  typeof UpdateCountryDTORequestSchema
>;
