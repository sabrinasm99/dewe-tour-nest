import { Controller, Delete, Inject, Req } from '@nestjs/common';
import { Request } from 'express';
import { DeleteCountryHandler } from './delete-country.handler';
import { DELETE_COUNTRY_HANDLER } from 'src/countries/country.constants';

@Controller()
export class DeleteCountryController {
  constructor(
    @Inject(DELETE_COUNTRY_HANDLER) private handler: DeleteCountryHandler,
  ) {}

  @Delete('/countries/:id')
  async delete(@Req() req: Request) {
    const { id } = req.params;

    await this.handler.execute({ id });

    return { message: 'Success', data: { id } };
  }
}
