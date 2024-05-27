import { TripRepository } from 'src/trips/repositories/trip.repository';
import {
  DeleteTripDTORequest,
  DeleteTripDTORequestSchema,
} from './delete-trip.dto.request';
import { Inject, Injectable } from '@nestjs/common';
import { TRIP_REPOSITORY } from 'src/trips/trip.constants';

export interface DeleteTripHandler {
  execute(id: DeleteTripDTORequest): Promise<void>;
}

@Injectable()
export class DeleteTripHandlerImpl implements DeleteTripHandler {
  constructor(@Inject(TRIP_REPOSITORY) private tripRepo: TripRepository) {}

  async execute(id: DeleteTripDTORequest) {
    id = DeleteTripDTORequestSchema.parse(id);

    const trip = await this.tripRepo.findById(id);

    if (!trip) {
      throw new Error('Trip is not found');
    }

    await this.tripRepo.delete(id);
  }
}
