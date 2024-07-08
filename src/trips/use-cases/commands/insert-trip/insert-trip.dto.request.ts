import { CoverImageDTO } from 'src/trips/shared/dtos/cover-image.dto.request';
import { DetailedImagesDTO } from 'src/trips/shared/dtos/detailed-images.dto.request';
import { z } from 'zod';

export const InsertTripDTORequestSchema = z.object({
  title: z.string(),
  country_id: z.string().uuid(),
  quota: z.number().int().nonnegative(),
  accomodation: z.string(),
  transportation: z.string(),
  eat: z.string(),
  days: z.number().int().nonnegative(),
  nights: z.number().int().nonnegative(),
  date: z.date(),
  price: z.number().int().nonnegative(),
  description: z.string(),
  cover_image: CoverImageDTO,
  detailed_images: DetailedImagesDTO,
});

export type InsertTripDTORequest = z.infer<typeof InsertTripDTORequestSchema>;
