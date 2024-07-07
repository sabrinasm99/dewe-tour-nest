import {
  Controller,
  FileTypeValidator,
  Inject,
  ParseFilePipe,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { InsertTripHandler } from './insert-trip.handler';
import { INSERT_TRIP_HANDLER } from 'src/trips/trip.constants';
import filenameGenerator from 'src/shared/filename-generator';

@Controller()
export class InsertTripController {
  constructor(
    @Inject(INSERT_TRIP_HANDLER) private handler: InsertTripHandler,
  ) {}

  @Post('/trips')
  @UseInterceptors(FilesInterceptor('image'))
  async insert(
    @Req() req: Request,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    const body = req.body;

    const filenames = [];
    const fileBuffers = [];

    files.forEach((file) => {
      filenames.push(filenameGenerator(file.fieldname, file.originalname));
      fileBuffers.push(file.buffer);
    });

    const trip = await this.handler.execute({
      ...body,
      quota: Number(body.quota),
      days: Number(body.days),
      nights: Number(body.nights),
      date: new Date(body.date),
      price: Number(body.price),
      images_filename: filenames,
      images_buffer: fileBuffers,
    });

    const { id } = trip.getProps();

    return { message: 'Success', data: { id } };
  }
}
