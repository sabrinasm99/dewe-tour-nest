import { Injectable } from '@nestjs/common';
import { PgConnection } from 'src/connections/database/pg.connection.service';
import { CountryRepository } from '../country.repository';
import { Country } from 'src/countries/domain/country.domain';

@Injectable()
export class CountryPgRepository implements CountryRepository {
  constructor(private client: PgConnection) {}

  async insert(country: Country): Promise<void> {
    const props = country.getProps();

    const text =
      'INSERT INTO countries(id, name, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [props.id, props.name, props.created_at, props.updated_at];

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

    return Country.create({ ...row });
  }

  async update(country: Country) {
    const props = country.getProps();

    const text =
      'UPDATE countries SET name = $1, updated_at = $2 WHERE id = $3';
    const values = [props.name, props.updated_at, props.id];

    await this.client.query(text, values);
  }

  async delete(id: string): Promise<void> {
    const text = 'DELETE FROM countries WHERE id = $1';
    const value = [id];

    await this.client.query(text, value);
  }
}
