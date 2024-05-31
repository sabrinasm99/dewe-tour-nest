import { z } from 'zod';

export const UpdateStatusToApprovedDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type UpdateStatusToApprovedDTORequest = z.infer<
  typeof UpdateStatusToApprovedDTORequestSchema
>;
