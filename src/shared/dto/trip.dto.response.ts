import { CountryDTOResponseSchema } from 'src/shared/dto/country.dto.response';
import { z } from 'zod';

export const TripDTOResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  country: CountryDTOResponseSchema,
  quota: z.number().int().nonnegative(),
  booked_slots: z.number().int().nonnegative(),
  accomodation: z.string(),
  eat: z.string(),
  days: z.number().int().nonnegative(),
  nights: z.number().int().nonnegative(),
  date: z.string().transform((val) => new Date(val)),
  price: z.number().int().nonnegative(),
  description: z.string(),
  image: z.string(),
});
