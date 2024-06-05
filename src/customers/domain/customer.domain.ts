import { z } from 'zod';

const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean().optional(),
  gender: z.enum(['male', 'female']),
  image: z.string().nullable().optional(),
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

  updateName(name: string) {
    this.props.name = CustomerSchema.shape.name.parse(name);
  }

  updateEmail(email: string) {
    this.props.email = CustomerSchema.shape.email.parse(email);
  }

  updatePhone(phone: string) {
    this.props.phone = CustomerSchema.shape.phone.parse(phone);
  }

  updateAddress(address: string) {
    this.props.address = CustomerSchema.shape.address.parse(address);
  }

  updateIsAdmin(isAdmin: boolean) {
    this.props.is_admin = CustomerSchema.shape.is_admin.parse(isAdmin);
  }

  updateGender(gender: string) {
    this.props.gender = CustomerSchema.shape.gender.parse(gender);
  }

  updateImage(image: string) {
    this.props.image = CustomerSchema.shape.image.parse(image);
  }

  updatePassword(password: string) {
    this.props.password = CustomerSchema.shape.password.parse(password);
  }
}
