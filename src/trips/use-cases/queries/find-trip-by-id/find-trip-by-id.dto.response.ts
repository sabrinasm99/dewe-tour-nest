import { z } from 'zod';
import { CountryDTOResponseSchema } from '../../../../shared/dto/country.dto.response';

export const FindTripByIdDTOResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  country: CountryDTOResponseSchema,
  quota: z.number().int().nonnegative(),
  booked_slots: z.number().int().nonnegative(),
  accomodation: z.string(),
  transportation: z.string(),
  eat: z.string(),
  days: z.number().int().nonnegative(),
  nights: z.number().int().nonnegative(),
  date: z.date().transform((val) => {
    const newDate = new Date(val);
    const date = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear();
    return `${date} ${month} ${year}`;
  }),
  price: z.number().int().nonnegative(),
  description: z.string(),
  cover_image: z.string(),
  detailed_images: z.string().transform((images) => images.split(',')),
});

export type FindTripByIdDTOResponse = z.infer<
  typeof FindTripByIdDTOResponseSchema
>;
