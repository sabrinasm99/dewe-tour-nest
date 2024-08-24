import { CountryRepository } from 'src/countries/repositories/country.repository';
import {
  DeleteCountryDTORequest,
  DeleteCountryDTORequestSchema,
} from './delete-country.dto.request';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { COUNTRY_REPOSITORY } from 'src/countries/country.constants';

export interface DeleteCountryHandler {
  execute(params: DeleteCountryDTORequest): Promise<void>;
}

@Injectable()
export class DeleteCountryHandlerImpl implements DeleteCountryHandler {
  constructor(
    @Inject(COUNTRY_REPOSITORY) private countryRepo: CountryRepository,
  ) {}

  async execute(params: DeleteCountryDTORequest) {
    params = DeleteCountryDTORequestSchema.parse(params);

    const country = await this.countryRepo.findById(params.id);

    if (!country) {
      throw new NotFoundException('Country is not found');
    }

    await this.countryRepo.delete(params.id);
  }
}
