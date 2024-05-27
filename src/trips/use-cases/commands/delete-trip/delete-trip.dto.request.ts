import { z } from 'zod';

export const DeleteTripDTORequestSchema = z.string().uuid();

export type DeleteTripDTORequest = z.infer<typeof DeleteTripDTORequestSchema>;
