import { Country } from 'src/countries/domain/country.domain';
import {
  InsertCountryDTORequest,
  InsertCountryDTORequestSchema,
} from './insert-country.dto.request';
import { CountryRepository } from 'src/countries/repositories/country.repository';
import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { COUNTRY_REPOSITORY } from 'src/countries/country.constants';

export interface InsertCountryHandler {
  execute(params: InsertCountryDTORequest): Promise<Country>;
}

@Injectable()
export class InsertCountryHandlerImpl implements InsertCountryHandler {
  constructor(
    @Inject(COUNTRY_REPOSITORY) private countryRepo: CountryRepository,
  ) {}

  async execute(params: InsertCountryDTORequest) {
    params = InsertCountryDTORequestSchema.parse(params);

    const id = v4();

    const country = Country.create({
      id,
      name: params.name,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.countryRepo.insert(country);

    return country;
  }
}
