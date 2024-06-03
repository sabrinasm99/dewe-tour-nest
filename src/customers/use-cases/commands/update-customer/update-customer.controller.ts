import {
  Controller,
  FileTypeValidator,
  Inject,
  ParseFilePipe,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateCustomerHandler } from './update-customer.handler';
import { UPDATE_CUSTOMER_HANDLER } from 'src/customers/customer.constants';
import { Request } from 'express';
import multerOptions from 'src/shared/multer-option';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UpdateCustomerController {
  constructor(
    @Inject(UPDATE_CUSTOMER_HANDLER) private handler: UpdateCustomerHandler,
  ) {}

  @Put('/customers/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const params = req.body;
    const { id } = req.params;

    await this.handler.execute({ id, ...params, image: file?.filename });

    return { message: 'Success', data: { id } };
  }
}
