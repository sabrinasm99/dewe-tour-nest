import { z } from 'zod';

const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean().optional(),
  gender: z.enum(['male', 'female']),
  image: z.string().optional(),
});

export type CustomerProps = z.infer<typeof CustomerSchema>;

export class Customer {
  constructor(private props: CustomerProps) {}

  public getProps() {
    return this.props;
  }

  public static create(props: CustomerProps) {
    const validatedProps = CustomerSchema.parse(props);
    return new Customer(validatedProps);
  }
}
