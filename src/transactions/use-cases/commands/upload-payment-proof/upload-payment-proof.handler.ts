import { z } from 'zod';

export const UploadPaymentProofDTORequestSchema = z.object({
  id: z.string().uuid(),
  attachment: z.string(),
});

export type UploadPaymentProofDTORequest = z.infer<
  typeof UploadPaymentProofDTORequestSchema
>;
