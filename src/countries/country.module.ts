import { Module } from '@nestjs/common';
import {
  COUNTRY_REPOSITORY,
  INSERT_COUNTRY_HANDLER,
  LIST_COUNTRY_HANDLER,
} from './country.constants';
import { ListCountryHandlerImpl } from './use-cases/queries/list-country/list-country.handler';
import { ListCountryController } from './use-cases/queries/list-country/list-country.controller';
import { InsertCountryController } from './use-cases/commands/insert-country/insert-country.controller';
import { CountryPgRepository } from './repositories/implementations/country.pg.impl.repository';
import { InsertCountryHandlerImpl } from './use-cases/commands/insert-country/insert-country.handler';

@Module({
  controllers: [ListCountryController, InsertCountryController],
  providers: [
    {
      provide: COUNTRY_REPOSITORY,
      useClass: CountryPgRepository,
    },
    {
      provide: LIST_COUNTRY_HANDLER,
      useClass: ListCountryHandlerImpl,
    },
    {
      provide: INSERT_COUNTRY_HANDLER,
      useClass: InsertCountryHandlerImpl,
    },
  ],
})
export class CountryModule {}
