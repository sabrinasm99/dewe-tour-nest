import { z } from 'zod';

const TripSchema = z.object({
  title: z.string(),
});
