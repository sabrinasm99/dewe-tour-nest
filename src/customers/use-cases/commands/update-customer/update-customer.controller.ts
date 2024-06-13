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
import filenameGenerator from 'src/shared/filename-generator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UpdateCustomerController {
  constructor(
    @Inject(UPDATE_CUSTOMER_HANDLER) private handler: UpdateCustomerHandler,
  ) {}

  @Put('/customers/:id')
  @UseInterceptors(FileInterceptor('image'))
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
    const body = req.body;
    const { id } = req.params;

    if (file) {
      const filename = filenameGenerator(file.fieldname, file.originalname);

      await this.handler.execute({
        id,
        ...body,
        image_filename: filename,
        image_buffer: file.buffer,
      });
    } else {
      await this.handler.execute({ id, ...body });
    }

    return { message: 'Success', data: { id } };
  }
}
