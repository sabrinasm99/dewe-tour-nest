import { z } from 'zod';

const TripSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  country_id: z.string().uuid(),
  quota: z.number().int().nonnegative(),
  booked_slots: z.number().int().nonnegative().optional(),
  accomodation: z.string(),
  transportation: z.string(),
  eat: z.string(),
  days: z.number().int().nonnegative(),
  nights: z.number().int().nonnegative(),
  date: z.date(),
  price: z.number().int().nonnegative(),
  description: z.string(),
  cover_image: z.string(),
  detailed_images: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
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
    this.update();
  }

  updateCountryId(countryId: string) {
    this.props.country_id = TripSchema.shape.country_id.parse(countryId);
    this.update();
  }

  updateQuota(quota: number) {
    this.props.quota = TripSchema.shape.quota.parse(quota);
    this.update();
  }

  updateBookedSlots(bookedSlots: number) {
    const slots = TripSchema.shape.booked_slots.parse(bookedSlots);
    this.props.booked_slots += slots;
    this.update();
  }

  updateTransportation(transportation: string) {
    this.props.transportation =
      TripSchema.shape.transportation.parse(transportation);
    this.update();
  }

  updateAccomodation(accomodation: string) {
    this.props.accomodation = TripSchema.shape.accomodation.parse(accomodation);
    this.update();
  }

  updateEat(eat: string) {
    this.props.eat = TripSchema.shape.eat.parse(eat);
    this.update();
  }

  updateDays(days: number) {
    this.props.days = TripSchema.shape.days.parse(days);
    this.update();
  }

  updateNights(nights: number) {
    this.props.nights = TripSchema.shape.nights.parse(nights);
    this.update();
  }

  updateDate(date: Date) {
    this.props.date = TripSchema.shape.date.parse(date);
    this.update();
  }

  updatePrice(price: number) {
    this.props.price = TripSchema.shape.price.parse(price);
    this.update();
  }

  updateDescription(description: string) {
    this.props.description = TripSchema.shape.description.parse(description);
    this.update();
  }

  updateCoverImage(image: string) {
    this.props.cover_image = TripSchema.shape.cover_image.parse(image);
    this.update();
  }

  updateDetailedImages(images: string) {
    this.props.detailed_images = TripSchema.shape.detailed_images.parse(images);
    this.update();
  }

  private update() {
    this.props.updated_at = new Date();
  }
}
