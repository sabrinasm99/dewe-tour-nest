import { z } from 'zod';
import { UpdateTripDTORequest } from '../use-cases/commands/update-trip/update-trip.dto.request';

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

  public static create(props: TripProps) {
    const validatedProps = TripSchema.parse(props);
    return new Trip(validatedProps);
  }

  updateTitle(title: string) {
    this.props.title = TripSchema.shape.title.parse(title);
  }

  updateCountryId(countryId: string) {
    this.props.country_id = TripSchema.shape.country_id.parse(countryId);
  }

  updateQuota(quota: number) {
    this.props.quota = TripSchema.shape.quota.parse(quota);
  }

  updateBookedSlots(bookedSlots: number) {
    this.props.booked_slots = TripSchema.shape.booked_slots.parse(bookedSlots);
  }

  updateAccomodation(accomodation: string) {
    this.props.accomodation = TripSchema.shape.accomodation.parse(accomodation);
  }

  updateEat(eat: string) {
    this.props.eat = TripSchema.shape.eat.parse(eat);
  }

  updateDays(days: number) {
    this.props.days = TripSchema.shape.days.parse(days);
  }

  updateNights(nights: number) {
    this.props.nights = TripSchema.shape.nights.parse(nights);
  }

  updateDate(date: Date) {
    this.props.date = TripSchema.shape.date.parse(date);
  }

  updatePrice(price: number) {
    this.props.price = TripSchema.shape.price.parse(price);
  }

  updateDescription(description: string) {
    this.props.description = TripSchema.shape.description.parse(description);
  }

  updateImage(image: string) {
    this.props.image = TripSchema.shape.image.parse(image);
  }
}
