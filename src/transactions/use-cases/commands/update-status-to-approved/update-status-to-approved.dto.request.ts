import { z } from 'zod';

export const UpdateStatusToApprovedDTORequestSchema = z.object({
  id: z.number(),
});

export type UpdateStatusToApprovedDTORequest = z.infer<
  typeof UpdateStatusToApprovedDTORequestSchema
>;
