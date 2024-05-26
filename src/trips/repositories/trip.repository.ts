import { Trip } from '../domain/trip.domain';

export interface TripRepository {
  insert(trip: Trip): Promise<void>;
  update(trip: Trip): Promise<void>;
  delete(id: string): Promise<void>;
}
