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
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const body = req.body;
    const { id } = req.params;

    const bodyTransform = {
      id,
      ...body,
      quota: !isNaN(Number(body.quota)) && Number(body.quota),
      booked_slots:
        !isNaN(Number(body.booked_slots)) && Number(body.booked_slots),
      days: !isNaN(Number(body.days)) && Number(body.days),
      nights: !isNaN(Number(body.nights)) && Number(body.nights),
      date: body.date && new Date(body.date),
      price: !isNaN(Number(body.price)) && Number(body.price),
    };

    if (file) {
      const filename = filenameGenerator(file.fieldname, file.originalname);

      await this.handler.execute({
        ...bodyTransform,
        image_filename: filename,
        image_buffer: file.buffer,
      });
    } else {
      await this.handler.execute({ ...bodyTransform });
    }

    return { message: 'Success', data: { id } };
  }
}
