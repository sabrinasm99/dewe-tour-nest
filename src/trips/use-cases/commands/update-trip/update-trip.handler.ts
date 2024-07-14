import { Trip } from 'src/trips/domain/trip.domain';
import {
  UpdateTripDTORequest,
  UpdateTripDTORequestSchema,
} from './update-trip.dto.request';
import { TripRepository } from 'src/trips/repositories/trip.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRIP_REPOSITORY } from 'src/trips/trip.constants';
import { unlink, writeFile } from 'fs/promises';

type NewDetailedImagesProps = {
  filePath: string;
  fileBuffer: Buffer;
};
export interface UpdateTripHandler {
  execute(params: UpdateTripDTORequest): Promise<Trip>;
}

async function writeDetailedImages(
  newDetailedImages: NewDetailedImagesProps[],
) {
  for (let i = 0; i < newDetailedImages.length; i++) {
    await writeFile(
      newDetailedImages[i].filePath,
      newDetailedImages[i].fileBuffer,
    );
  }
}

@Injectable()
export class UpdateTripHandlerImpl implements UpdateTripHandler {
  constructor(@Inject(TRIP_REPOSITORY) private tripRepo: TripRepository) {}

  async execute(params: UpdateTripDTORequest) {
    params = UpdateTripDTORequestSchema.parse(params);

    const trip = await this.tripRepo.findById(params.id);

    if (!trip) {
      throw new NotFoundException('Trip is not found');
    }

    if (params.title) {
      trip.updateTitle(params.title);
    }

    if (params.country_id) {
      trip.updateCountryId(params.country_id);
    }

    if (params.quota) {
      trip.updateQuota(params.quota);
    }

    if (params.booked_slots) {
      trip.updateBookedSlots(params.booked_slots);
    }

    if (params.accomodation) {
      trip.updateAccomodation(params.accomodation);
    }

    if (params.transportation) {
      trip.updateTransportation(params.transportation);
    }

    if (params.eat) {
      trip.updateEat(params.eat);
    }

    if (params.days) {
      trip.updateDays(params.days);
    }

    if (params.nights) {
      trip.updateNights(params.nights);
    }

    if (params.date) {
      trip.updateDate(params.date);
    }

    if (params.price) {
      trip.updatePrice(params.price);
    }

    if (params.description) {
      trip.updateDescription(params.description);
    }

    let newCoverImagePath: string,
      oldCoverImagePath: string,
      newDetailedImagesPath: NewDetailedImagesProps[],
      deletedDetailedImagesPath: string[],
      newDetailedImages: string[],
      updatedDetailedImages: string[];

    const { cover_image, detailed_images } = trip.getProps();

    if (cover_image) {
      oldCoverImagePath = `./images/trip-picture/${cover_image}`;
    }

    if (params.cover_image) {
      newCoverImagePath = `./images/trip-picture/${params.cover_image.filename}`;
      trip.updateCoverImage(params.cover_image.filename);
    }

    let oldDetailedImages = detailed_images.split(',');

    if (params.deleted_detailed_images) {
      deletedDetailedImagesPath = params.deleted_detailed_images.map(
        (image) => `./images/trip-picture/${image}`,
      );

      params.deleted_detailed_images.forEach((image) => {
        oldDetailedImages = oldDetailedImages.filter(
          (oldImage) => oldImage !== image,
        );
      });
    }

    if (params.detailed_images) {
      newDetailedImagesPath = params.detailed_images.map((image) => {
        return {
          filePath: `./images/trip-picture/${image.filename}`,
          fileBuffer: image.file_buffer,
        };
      });

      newDetailedImages = params.detailed_images.map((image) => image.filename);
    }

    if (newDetailedImages) {
      updatedDetailedImages = [...oldDetailedImages, ...newDetailedImages];
      trip.updateDetailedImages(updatedDetailedImages.toString());
    }

    await this.tripRepo.update(trip);

    if (oldCoverImagePath && newCoverImagePath) {
      await unlink(oldCoverImagePath);
      await writeFile(newCoverImagePath, params.cover_image.file_buffer);
    }

    if (!oldCoverImagePath && newCoverImagePath) {
      await writeFile(newCoverImagePath, params.cover_image.file_buffer);
    }

    if (deletedDetailedImagesPath && newDetailedImagesPath) {
      for (let i = 0; i < deletedDetailedImagesPath.length; i++) {
        await unlink(deletedDetailedImagesPath[i]);
      }

      await writeDetailedImages(newDetailedImagesPath);
    }

    if (!deletedDetailedImagesPath && newDetailedImagesPath) {
      await writeDetailedImages(newDetailedImagesPath);
    }

    return trip;
  }
}
