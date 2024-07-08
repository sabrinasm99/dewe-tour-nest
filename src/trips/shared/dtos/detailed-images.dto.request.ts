import { z } from 'zod';

export const DetailedImagesDTO = z.array(
  z.object({
    filename: z.string(),
    file_buffer: z.instanceof(Buffer),
  }),
);
