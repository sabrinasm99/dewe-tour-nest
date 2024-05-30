import { z } from 'zod';

export const InsertCountryDTORequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type InsertCountryDTORequest = z.infer<
  typeof InsertCountryDTORequestSchema
>;
