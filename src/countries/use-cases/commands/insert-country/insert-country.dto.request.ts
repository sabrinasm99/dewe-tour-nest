import { z } from 'zod';

export const InsertCountryDTORequestSchema = z.object({
  name: z.string(),
});

export type InsertCountryDTORequest = z.infer<
  typeof InsertCountryDTORequestSchema
>;
