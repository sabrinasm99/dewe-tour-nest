import { Trip } from 'src/trips/domain/trip.domain';
import {
  InsertTripDTORequest,
  InsertTripDTORequestSchema,
} from './insert-trip.dto.request';
import { TripRepository } from 'src/trips/repositories/trip.repository';
import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { TRIP_REPOSITORY } from 'src/trips/trip.constants';
import { writeFile } from 'fs/promises';

export interface InsertTripHandler {
  execute(params: InsertTripDTORequest): Promise<Trip>;
}

@Injectable()
export class InsertTripHandlerImpl implements InsertTripHandler {
  constructor(@Inject(TRIP_REPOSITORY) private tripRepo: TripRepository) {}

  async execute(params: InsertTripDTORequest) {
    params = InsertTripDTORequestSchema.parse(params);

    const id = v4();

    const trip = Trip.create({
      id,
      title: params.title,
      country_id: params.country_id,
      quota: params.quota,
      accomodation: params.accomodation,
      transportation: params.transportation,
      eat: params.eat,
      days: params.days,
      nights: params.nights,
      date: params.date,
      price: params.price,
      description: params.description,
      cover_image: params.cover_image.filename,
      detailed_images: params.detailed_images
        .map((image) => image.filename)
        .toString(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.tripRepo.insert(trip);

    const filePath = `./images/trip-picture/${params.cover_image.filename}`;
    await writeFile(filePath, params.cover_image.file_buffer);

    for (let i = 0; i < params.detailed_images.length; i++) {
      const filePath = `./images/trip-picture/${params.detailed_images[i].filename}`;
      const fileBuffer = params.detailed_images[i].file_buffer;
      await writeFile(filePath, fileBuffer);
    }

    return trip;
  }
}
