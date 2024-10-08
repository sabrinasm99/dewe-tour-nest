import { z } from 'zod';

export const UploadPaymentProofDTORequestSchema = z.object({
  id: z.number(),
  attachment_filename: z.string(),
  attachment_buffer: z.instanceof(Buffer),
});

export type UploadPaymentProofDTORequest = z.infer<
  typeof UploadPaymentProofDTORequestSchema
>;
