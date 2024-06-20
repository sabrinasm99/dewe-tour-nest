import { z } from 'zod';

export const CountryDTOResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
