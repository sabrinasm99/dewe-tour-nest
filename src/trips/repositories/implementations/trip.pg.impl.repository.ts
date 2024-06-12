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
      'INSERT INTO trips(id, title, country_id, quota, accomodation, eat, days, nights, date, price, description, image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
    const values = [
      props.id,
      props.title,
      props.country_id,
      props.quota,
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

  async update(trip: Trip): Promise<void> {
    const props = trip.getProps();

    const text =
      'UPDATE trips SET title = $1, country_id = $2, quota = $3, accomodation = $4, eat = $5, days = $6, nights = $7, date = $8, price = $9, description = $10, image = $11 WHERE id = $12';
    const values = [
      props.title,
      props.country_id,
      props.quota,
      props.accomodation,
      props.eat,
      props.days,
      props.nights,
      props.date,
      props.price,
      props.description,
      props.image,
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
