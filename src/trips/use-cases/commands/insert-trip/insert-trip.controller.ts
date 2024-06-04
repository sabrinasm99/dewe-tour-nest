import {
  Controller,
  FileTypeValidator,
  Inject,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { writeFile } from 'fs/promises';
import { InsertTripHandler } from './insert-trip.handler';
import { INSERT_TRIP_HANDLER } from 'src/trips/trip.constants';
import filenameGenerator from 'src/shared/filename-generator';

@Controller()
export class InsertTripController {
  constructor(
    @Inject(INSERT_TRIP_HANDLER) private handler: InsertTripHandler,
  ) {}

  @Post('/trips')
  @UseInterceptors(FileInterceptor('image'))
  async insert(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const body = req.body;

    const filename = filenameGenerator(file.fieldname, file.originalname);

    const trip = await this.handler.execute({
      ...body,
      quota: Number(body.quota),
      days: Number(body.days),
      nights: Number(body.nights),
      date: new Date(body.date),
      price: Number(body.price),
      image: filename,
    });

    const filePath = `./images/trip-picture/${filename}`;

    await writeFile(filePath, file.buffer);

    const { id } = trip.getProps();

    return { message: 'Success', data: { id } };
  }
}
