import { z } from 'zod';

export const UpdateStatusToWaitingApproveDTORequestSchema = z.object({
  id: z.number(),
});

export type UpdateStatusToWaitingApproveDTORequest = z.infer<
  typeof UpdateStatusToWaitingApproveDTORequestSchema
>;
