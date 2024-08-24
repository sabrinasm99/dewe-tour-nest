import { Country } from '../domain/country.domain';

export interface CountryRepository {
  insert(country: Country): Promise<void>;
  findById(id: string): Promise<Country | null>;
  delete(id: string): Promise<void>;
}
