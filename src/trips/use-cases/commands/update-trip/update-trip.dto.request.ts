import { z } from 'zod';

export const UpdateTripDTORequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  country_id: z.string().uuid().optional(),
  quota: z.number().int().nonnegative().optional(),
  booked_slots: z.number().int().nonnegative().optional(),
  accomodation: z.string().optional(),
  transportation: z.string().optional(),
  eat: z.string().optional(),
  days: z.number().int().nonnegative().optional(),
  nights: z.number().int().nonnegative().optional(),
  date: z.date().optional(),
  price: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  image_filename: z.string().optional(),
  image_buffer: z.instanceof(Buffer).optional(),
});

export type UpdateTripDTORequest = z.infer<typeof UpdateTripDTORequestSchema>;
