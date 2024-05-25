import { Trip } from '../domain/trip.domain';

export interface TripRepository {
  insert(trip: Trip): Promise<void>;
}
