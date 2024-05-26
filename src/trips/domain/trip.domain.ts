import { z } from 'zod';

const TripSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  country_id: z.string().uuid(),
  quota: z.number().int().nonnegative(),
  booked_slots: z.number().int().nonnegative(),
  accomodation: z.string(),
  eat: z.string(),
  days: z.number().int().nonnegative(),
  nights: z.number().int().nonnegative(),
  date: z.date(),
  price: z.number().int().nonnegative(),
  description: z.string(),
  image: z.string(),
});

export type TripProps = z.infer<typeof TripSchema>;

export class Trip {
  constructor(private props: TripProps) {}

  public getProps() {
    return this.props;
  }

  public static insert(props: TripProps) {
    const validatedProps = TripSchema.parse(props);
    return new Trip(validatedProps);
  }
}
