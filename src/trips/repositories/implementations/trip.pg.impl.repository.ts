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
      'INSERT INTO trips(id, title, country_id, accomodation, eat, days, nights, date, price, description, image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
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

  async update(trip: Trip): Promise<void> {
    const props = trip.getProps();

    const text =
      'UPDATE trips SET title = $1, country_id = $2, accomodation = $3, eat = $4, days = $5, nights = $6, date = $7, price = $8, description = $9, image = $10 WHERE id = $11';
    const values = [
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
