import { Controller, Get, Inject } from '@nestjs/common';
import { ListCountryHandler } from './list-country.handler';
import { LIST_COUNTRY_HANDLER } from 'src/countries/country.constants';

@Controller()
export class ListCountryController {
  constructor(
    @Inject(LIST_COUNTRY_HANDLER) private handler: ListCountryHandler,
  ) {}

  @Get('/countries')
  async findAll() {
    const result = await this.handler.execute();

    return { message: 'Success', data: result };
  }
}
