import { Country } from '../domain/country.domain';

export interface CountryRepository {
  insert(country: Country): Promise<void>;
  findById(id: string): Promise<Country | null>;
  update(country: Country): Promise<void>;
  delete(id: string): Promise<void>;
}
