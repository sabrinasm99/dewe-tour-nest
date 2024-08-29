import { Country } from 'src/countries/domain/country.domain';
import {
  UpdateCountryDTORequest,
  UpdateCountryDTORequestSchema,
} from './update-country.dto.request';
import { CountryRepository } from 'src/countries/repositories/country.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { COUNTRY_REPOSITORY } from 'src/countries/country.constants';

export interface UpdateCountryHandler {
  execute(params: UpdateCountryDTORequest): Promise<Country>;
}

@Injectable()
export class UpdateCountryHandlerImpl implements UpdateCountryHandler {
  constructor(
    @Inject(COUNTRY_REPOSITORY) private countryRepo: CountryRepository,
  ) {}

  async execute(params: UpdateCountryDTORequest) {
    params = UpdateCountryDTORequestSchema.parse(params);

    const country = await this.countryRepo.findById(params.id);

    if (!country) {
      throw new NotFoundException('Country is not found');
    }

    if (params.name) {
      country.updateName(params.name);
    }

    await this.countryRepo.update(country);

    return country;
  }
}
