import { z } from 'zod';

export const CoverImageDTO = z.object({
  filename: z.string(),
  file_buffer: z.instanceof(Buffer),
});
