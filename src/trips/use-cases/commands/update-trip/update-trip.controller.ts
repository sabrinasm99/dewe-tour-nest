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
import { UpdateTripHandler } from './update-trip.handler';
import { Request } from 'express';
import { UPDATE_TRIP_HANDLER } from 'src/trips/trip.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import filenameGenerator from 'src/shared/filename-generator';
import { writeFile } from 'fs/promises';

@Controller()
export class UpdateTripController {
  constructor(
    @Inject(UPDATE_TRIP_HANDLER) private handler: UpdateTripHandler,
  ) {}

  @Put('/trips/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const body = req.body;
    const { id } = req.params;

    if (file) {
      const filename = filenameGenerator(file.fieldname, file.originalname);
      const filePath = `./images/trip-picture/${filename}`;

      await this.handler.execute({ id, ...body, image: filename });

      await writeFile(filePath, filename);
    } else {
      await this.handler.execute({ id, ...body });
    }

    return { message: 'Success', data: { id } };
  }
}
