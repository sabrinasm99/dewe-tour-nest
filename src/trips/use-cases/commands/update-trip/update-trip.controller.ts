import {
  Controller,
  Inject,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UpdateTripHandler } from './update-trip.handler';
import { Request } from 'express';
import { UPDATE_TRIP_HANDLER } from 'src/trips/trip.constants';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import filenameGenerator from 'src/shared/filename-generator';
import { FileTypeValidatorPipe } from 'src/trips/shared/validator/file-type-validator.pipe';

@Controller()
export class UpdateTripController {
  constructor(
    @Inject(UPDATE_TRIP_HANDLER) private handler: UpdateTripHandler,
  ) {}

  @Put('/trips/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover_image', maxCount: 1 },
      { name: 'detailed_images' },
    ]),
  )
  @UsePipes(new FileTypeValidatorPipe(['.jpg', '.jpeg', '.png']))
  async update(
    @Req() req: Request,
    @UploadedFiles()
    files: {
      cover_image: Express.Multer.File[];
      detailed_images: Express.Multer.File[];
    },
  ) {
    const body = req.body;
    const { id } = req.params;

    const bodyTransform = {
      id,
      ...body,
      quota: !isNaN(Number(body.quota)) ? Number(body.quota) : undefined,
      booked_slots: !isNaN(Number(body.booked_slots))
        ? Number(body.booked_slots)
        : undefined,
      days: !isNaN(Number(body.days)) ? Number(body.days) : undefined,
      nights: !isNaN(Number(body.nights)) ? Number(body.nights) : undefined,
      date: body.date ? new Date(body.date) : undefined,
      price: !isNaN(Number(body.price)) ? Number(body.price) : undefined,
      cover_image: files.cover_image
        ? {
            filename: filenameGenerator(
              files.cover_image[0].fieldname,
              files.cover_image[0].originalname,
            ),
          }
        : undefined,
      detailed_images: files.detailed_images
        ? files.detailed_images.map((file) => {
            return {
              filename: filenameGenerator(file.fieldname, file.originalname),
              file_buffer: file.buffer,
            };
          })
        : undefined,
      deleted_detailed_images:
        typeof body.deleted_detailed_images === 'string'
          ? body.deleted_detailed_images.split()
          : body.deleted_detailed_images,
    };

    await this.handler.execute({
      ...bodyTransform,
    });

    return { message: 'Success', data: { id } };
  }
}
