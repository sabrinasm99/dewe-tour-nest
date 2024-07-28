import { z } from 'zod';

export const ListCountryDTOResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
  }),
);

export type ListCountryDTOResponse = z.infer<
  typeof ListCountryDTOResponseSchema
>;
