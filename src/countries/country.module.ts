import { Module } from '@nestjs/common';
import {
  COUNTRY_REPOSITORY,
  DELETE_COUNTRY_HANDLER,
  INSERT_COUNTRY_HANDLER,
  LIST_COUNTRY_HANDLER,
} from './country.constants';
import { ListCountryHandlerImpl } from './use-cases/queries/list-country/list-country.handler';
import { ListCountryController } from './use-cases/queries/list-country/list-country.controller';
import { InsertCountryController } from './use-cases/commands/insert-country/insert-country.controller';
import { CountryPgRepository } from './repositories/implementations/country.pg.impl.repository';
import { InsertCountryHandlerImpl } from './use-cases/commands/insert-country/insert-country.handler';
import { DeleteCountryHandlerImpl } from './use-cases/commands/delete-country/delete-country.handler';
import { DeleteCountryController } from './use-cases/commands/delete-country/delete-country.controller';

@Module({
  controllers: [
    ListCountryController,
    InsertCountryController,
    DeleteCountryController,
  ],
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
    {
      provide: DELETE_COUNTRY_HANDLER,
      useClass: DeleteCountryHandlerImpl,
    },
  ],
})
export class CountryModule {}
