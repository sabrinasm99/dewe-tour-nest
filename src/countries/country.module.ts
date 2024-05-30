import { Module } from '@nestjs/common';
import { LIST_COUNTRY_HANDLER } from './country.constants';
import { ListCountryHandlerImpl } from './use-cases/queries/list-country/list-country.handler';
import { ListCountryController } from './use-cases/queries/list-country/list-country.controller';

@Module({
  controllers: [ListCountryController],
  providers: [
    { provide: LIST_COUNTRY_HANDLER, useClass: ListCountryHandlerImpl },
  ],
})
export class CountryModule {}
