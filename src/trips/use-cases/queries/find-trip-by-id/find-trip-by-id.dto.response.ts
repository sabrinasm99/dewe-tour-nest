import { z } from 'zod';

export const FindTripByIdDTOResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  country_id: z.string().uuid(),
  quota: z.number().int().nonnegative(),
  booked_slots: z.number().int().nonnegative(),
  accomodation: z.string(),
  eat: z.string(),
  days: z.number().int().nonnegative(),
  nights: z.number().int().nonnegative(),
  date: z.date(),
  price: z.number().int().nonnegative(),
  description: z.string(),
  image: z.string(),
});

export type FindTripByIdDTOResponse = z.infer<
  typeof FindTripByIdDTOResponseSchema
>;
