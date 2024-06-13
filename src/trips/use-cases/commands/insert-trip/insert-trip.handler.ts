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
      booked_slots: 0,
      accomodation: params.accomodation,
      eat: params.eat,
      days: params.days,
      nights: params.nights,
      date: params.date,
      price: params.price,
      description: params.description,
      image: params.image_filename,
    });

    await this.tripRepo.insert(trip);

    const filePath = `./images/trip-picture/${params.image_filename}`;

    await writeFile(filePath, params.image_buffer);

    return trip;
  }
}
