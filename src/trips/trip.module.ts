import { Module } from '@nestjs/common';
import { InsertTripController } from './use-cases/commands/insert-trip/insert-trip.controller';
import {
  INSERT_TRIP_HANDLER,
  LIST_TRIP_HANDLER,
  TRIP_REPOSITORY,
} from './trip.constants';
import { TripPgRepository } from './repositories/implementations/trip.pg.impl.repository';
import { InsertTripHandlerImpl } from './use-cases/commands/insert-trip/insert-trip.handler';
import { ListTripController } from './use-cases/queries/list-trip/list-trip.controller';
import { ListTripHandlerImpl } from './use-cases/queries/list-trip/list-trip.handler';

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
  ],
})
export class TripModule {}
