import { Controller, Inject, Put, Req } from '@nestjs/common';
import { UpdateCountryHandler } from './update-country.handler';
import { Request } from 'express';
import { UPDATE_COUNTRY_HANDLER } from 'src/countries/country.constants';

@Controller()
export class UpdateCountryController {
  constructor(
    @Inject(UPDATE_COUNTRY_HANDLER) private handler: UpdateCountryHandler,
  ) {}

  @Put('/countries/:id')
  async update(@Req() req: Request) {
    const { id } = req.params;
    const { name } = req.body;

    await this.handler.execute({
      id,
      name,
    });

    return { message: 'Success', data: { id } };
  }
}
