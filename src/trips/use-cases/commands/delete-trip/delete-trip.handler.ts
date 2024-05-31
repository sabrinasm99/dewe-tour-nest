import { TripRepository } from 'src/trips/repositories/trip.repository';
import {
  DeleteTripDTORequest,
  DeleteTripDTORequestSchema,
} from './delete-trip.dto.request';
import { Inject, Injectable } from '@nestjs/common';
import { TRIP_REPOSITORY } from 'src/trips/trip.constants';

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
      throw new Error('Trip is not found');
    }

    await this.tripRepo.delete(params.id);
  }
}
