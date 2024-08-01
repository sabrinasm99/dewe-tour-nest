import { z } from 'zod';

export const CountryDTOResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.string().transform((val) => new Date(val)),
  updated_at: z.string().transform((val) => new Date(val)),
});
