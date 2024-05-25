import { Trip } from 'src/trips/domain/trip.domain';
import { TripRepository } from '../trip.repository';
import { PgConnection } from 'src/connections/database/pg.connection.service';

export class TripPgRepository implements TripRepository {
  constructor(private client: PgConnection) {}

  async insert(trip: Trip): Promise<void> {
    const props = trip.getProps();

    const text =
      'INSERT INTO trips(id, title, country_id, accomodation, eat, days, nights, date, price, description, image';
    const values = [
      props.id,
      props.title,
      props.country_id,
      props.accomodation,
      props.eat,
      props.days,
      props.nights,
      props.date,
      props.price,
      props.description,
      props.image,
    ];

    await this.client.query(text, values);
  }
}
