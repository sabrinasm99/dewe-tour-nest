import { z } from 'zod';

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  is_admin: z.boolean().optional(),
  gender: z.nativeEnum(GENDER),
  image: z.string().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
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
    this.update();
  }

  updateEmail(email: string) {
    this.props.email = CustomerSchema.shape.email.parse(email);
    this.update();
  }

  updatePhone(phone: string) {
    this.props.phone = CustomerSchema.shape.phone.parse(phone);
    this.update();
  }

  updateAddress(address: string) {
    this.props.address = CustomerSchema.shape.address.parse(address);
    this.update();
  }

  updateIsAdmin(isAdmin: boolean) {
    this.props.is_admin = CustomerSchema.shape.is_admin.parse(isAdmin);
    this.update();
  }

  updateGender(gender: GENDER) {
    this.props.gender = CustomerSchema.shape.gender.parse(gender);
    this.update();
  }

  updateImage(image: string) {
    this.props.image = CustomerSchema.shape.image.parse(image);
    this.update();
  }

  updatePassword(password: string) {
    this.props.password = CustomerSchema.shape.password.parse(password);
    this.update();
  }

  private update() {
    this.props.updated_at = new Date();
  }
}
