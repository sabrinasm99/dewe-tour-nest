import { Trip } from 'src/trips/domain/trip.domain';
import { TripRepository } from '../trip.repository';
import { PgConnection } from 'src/connections/database/pg.connection.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TripPgRepository implements TripRepository {
  constructor(private client: PgConnection) {}

  async insert(trip: Trip): Promise<void> {
    const props = trip.getProps();

    const text =
      'INSERT INTO trips(id, title, country_id, quota, accomodation, transportation, eat, days, nights, date, price, description, cover_image, detailed_images) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
    const values = [
      props.id,
      props.title,
      props.country_id,
      props.quota,
      props.accomodation,
      props.transportation,
      props.eat,
      props.days,
      props.nights,
      props.date,
      props.price,
      props.description,
      props.cover_image,
      props.detailed_images,
    ];

    await this.client.query(text, values);
  }

  async update(trip: Trip): Promise<void> {
    const props = trip.getProps();

    const text =
      'UPDATE trips SET title = $1, country_id = $2, quota = $3, booked_slots = $4, accomodation = $5, transportation = $6, eat = $7, days = $8, nights = $9, date = $10, price = $11, description = $12, cover_image = $13, detailed_images = $14 WHERE id = $15';
    const values = [
      props.title,
      props.country_id,
      props.quota,
      props.booked_slots,
      props.accomodation,
      props.transportation,
      props.eat,
      props.days,
      props.nights,
      props.date,
      props.price,
      props.description,
      props.cover_image,
      props.detailed_images,
      props.id,
    ];

    await this.client.query(text, values);
  }

  async delete(id: string): Promise<void> {
    const text = 'DELETE FROM trips WHERE id = $1';
    const value = [id];

    await this.client.query(text, value);
  }

  async findById(id: string): Promise<Trip | null> {
    const text = 'SELECT * FROM trips WHERE id = $1';
    const value = [id];

    const result = await this.client.query(text, value);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return Trip.create(row);
  }
}
