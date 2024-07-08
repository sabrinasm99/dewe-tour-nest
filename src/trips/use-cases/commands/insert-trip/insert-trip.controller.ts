import {
  Controller,
  Inject,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { InsertTripHandler } from './insert-trip.handler';
import { INSERT_TRIP_HANDLER } from 'src/trips/trip.constants';
import filenameGenerator from 'src/shared/filename-generator';
import { FileTypeValidatorPipe } from '../../../shared/validator/file-type-validator.pipe';

@Controller()
export class InsertTripController {
  constructor(
    @Inject(INSERT_TRIP_HANDLER) private handler: InsertTripHandler,
  ) {}

  @Post('/trips')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover_image', maxCount: 1 },
      { name: 'detailed_images' },
    ]),
  )
  @UsePipes(new FileTypeValidatorPipe(['.jpg', '.jpeg', '.png']))
  async insert(
    @Req() req: Request,
    @UploadedFiles()
    files: {
      cover_image: Express.Multer.File[];
      detailed_images: Express.Multer.File[];
    },
  ) {
    const body = req.body;

    const trip = await this.handler.execute({
      ...body,
      quota: Number(body.quota),
      days: Number(body.days),
      nights: Number(body.nights),
      date: new Date(body.date),
      price: Number(body.price),
      cover_image: {
        filename: filenameGenerator(
          files.cover_image[0].fieldname,
          files.cover_image[0].originalname,
        ),
        file_buffer: files.cover_image[0].buffer,
      },
      detailed_images: files.detailed_images.map((file) => {
        return {
          filename: filenameGenerator(file.fieldname, file.originalname),
          file_buffer: file.buffer,
        };
      }),
    });

    const { id } = trip.getProps();

    return { message: 'Success', data: { id } };
  }
}
