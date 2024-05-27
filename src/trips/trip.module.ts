import { Module } from '@nestjs/common';
import { InsertTripController } from './use-cases/commands/insert-trip/insert-trip.controller';
import {
  INSERT_TRIP_HANDLER,
  LIST_TRIP_HANDLER,
  TRIP_REPOSITORY,
  UPDATE_TRIP_HANDLER,
} from './trip.constants';
import { TripPgRepository } from './repositories/implementations/trip.pg.impl.repository';
import { InsertTripHandlerImpl } from './use-cases/commands/insert-trip/insert-trip.handler';
import { ListTripController } from './use-cases/queries/list-trip/list-trip.controller';
import { ListTripHandlerImpl } from './use-cases/queries/list-trip/list-trip.handler';
import { UpdateTripHandlerImpl } from './use-cases/commands/update-trip/update-trip.handler';

@Module({
  controllers: [InsertTripController, ListTripController],
  providers: [
    {
      provide: TRIP_REPOSITORY,
      useClass: TripPgRepository,
    },
    {
      provide: INSERT_TRIP_HANDLER,
      useClass: InsertTripHandlerImpl,
    },
    {
      provide: LIST_TRIP_HANDLER,
      useClass: ListTripHandlerImpl,
    },
    {
      provide: UPDATE_TRIP_HANDLER,
      useClass: UpdateTripHandlerImpl,
    },
  ],
})
export class TripModule {}
