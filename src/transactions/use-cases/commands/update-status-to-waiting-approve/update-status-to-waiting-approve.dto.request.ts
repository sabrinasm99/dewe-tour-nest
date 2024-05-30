import { z } from 'zod';

export const UpdateStatusToWaitingApproveDTORequestSchema = z.object({
  id: z.string().uuid(),
});

export type UpdateStatusToWaitingApproveDTORequest = z.infer<
  typeof UpdateStatusToWaitingApproveDTORequestSchema
>;
