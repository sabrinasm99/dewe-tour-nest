import { Injectable } from '@nestjs/common';
import { PgConnection } from 'src/connections/database/pg.connection.service';
import { CountryRepository } from '../country.repository';
import { Country } from 'src/countries/domain/country.domain';

@Injectable()
export class CountryPgRepository implements CountryRepository {
  constructor(private client: PgConnection) {}

  async insert(country: Country): Promise<void> {
    const props = country.getProps();

    const text = 'INSERT INTO countries(id, name) VALUES($1, $2) RETURNING *';
    const values = [props.id, props.name];

    await this.client.query(text, values);
  }

  async findById(id: string): Promise<Country | null> {
    const text = 'SELECT * FROM countries WHERE id = $1';
    const value = [id];

    const result = await this.client.query(text, value);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return Country.create(row);
  }
}
