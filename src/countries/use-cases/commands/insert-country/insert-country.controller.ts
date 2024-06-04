import { Controller, Inject, Post, Req } from '@nestjs/common';
import { InsertCountryHandler } from './insert-country.handler';
import { Request } from 'express';
import { INSERT_COUNTRY_HANDLER } from 'src/countries/country.constants';

@Controller()
export class InsertCountryController {
  constructor(
    @Inject(INSERT_COUNTRY_HANDLER) private handler: InsertCountryHandler,
  ) {}

  @Post('/countries')
  async insert(@Req() req: Request) {
    const body = req.body;

    const country = await this.handler.execute({ ...body });

    const { id } = country.getProps();

    return { message: 'Success', data: { id } };
  }
}
