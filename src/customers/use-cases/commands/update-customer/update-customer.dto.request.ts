import { GENDER } from 'src/customers/domain/customer.domain';
import { z } from 'zod';

export const UpdateCustomerDTORequestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  is_admin: z.boolean().optional(),
  gender: z.nativeEnum(GENDER).optional(),
  image_filename: z.string().optional(),
  image_buffer: z.instanceof(Buffer).optional(),
});

export type UpdateCustomerDTORequest = z.infer<
  typeof UpdateCustomerDTORequestSchema
>;
