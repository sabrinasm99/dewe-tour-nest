import { Trip } from 'src/trips/domain/trip.domain';
import {
  UpdateTripDTORequest,
  UpdateTripDTORequestSchema,
} from './update-trip.dto.request';
import { TripRepository } from 'src/trips/repositories/trip.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TRIP_REPOSITORY } from 'src/trips/trip.constants';

export interface UpdateTripHandler {
  execute(params: UpdateTripDTORequest): Promise<Trip>;
}

@Injectable()
export class UpdateTripHandlerImpl implements UpdateTripHandler {
  constructor(@Inject(TRIP_REPOSITORY) private tripRepo: TripRepository) {}

  async execute(params: UpdateTripDTORequest) {
    params = UpdateTripDTORequestSchema.parse(params);

    const trip = await this.tripRepo.findById(params.id);

    if (!trip) {
      throw new Error('Trip is not found');
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

    if (params.image) {
      trip.updateImage(params.image);
    }

    await this.tripRepo.update(trip);

    return trip;
  }
}
