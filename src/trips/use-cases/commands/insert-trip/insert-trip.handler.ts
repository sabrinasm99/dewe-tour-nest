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
      image: params.images_filename.toString(),
    });

    await this.tripRepo.insert(trip);

    for (let i = 0; i < params.images_filename.length; i++) {
      const filePath = `./images/trip-picture/${params.images_filename[i]}`;
      const fileBuffer = params.images_buffer[i];
      await writeFile(filePath, fileBuffer);
    }

    return trip;
  }
}
