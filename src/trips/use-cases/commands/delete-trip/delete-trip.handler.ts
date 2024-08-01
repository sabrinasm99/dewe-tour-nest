import { TripRepository } from 'src/trips/repositories/trip.repository';
import {
  DeleteTripDTORequest,
  DeleteTripDTORequestSchema,
} from './delete-trip.dto.request';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRIP_REPOSITORY, tripImagesDir } from 'src/trips/trip.constants';
import { unlink } from 'fs/promises';

export interface DeleteTripHandler {
  execute(params: DeleteTripDTORequest): Promise<void>;
}

@Injectable()
export class DeleteTripHandlerImpl implements DeleteTripHandler {
  constructor(@Inject(TRIP_REPOSITORY) private tripRepo: TripRepository) {}

  async execute(params: DeleteTripDTORequest) {
    params = DeleteTripDTORequestSchema.parse(params);

    const trip = await this.tripRepo.findById(params.id);

    if (!trip) {
      throw new NotFoundException('Trip is not found');
    }

    const { cover_image, detailed_images } = trip.getProps();

    let coverImagePath: string, detailedImagesPath: string[];

    if (cover_image) {
      coverImagePath = `${tripImagesDir}/${cover_image}`;
    }

    if (detailed_images) {
      detailedImagesPath = detailed_images
        .split(',')
        .map((image) => `${tripImagesDir}/${image}`);
    }

    await this.tripRepo.delete(params.id);

    if (coverImagePath) {
      await unlink(coverImagePath);
    }

    if (detailedImagesPath) {
      for (let i = 0; i < detailedImagesPath.length; i++) {
        await unlink(detailedImagesPath[i]);
      }
    }
  }
}
