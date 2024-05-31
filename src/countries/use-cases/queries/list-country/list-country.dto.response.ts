import { z } from 'zod';

export const ListCountryDTOResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
);

export type ListCountryDTOResponse = z.infer<
  typeof ListCountryDTOResponseSchema
>;
