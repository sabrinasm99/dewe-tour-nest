import { Module } from '@nestjs/common';
import { InsertTripController } from './use-cases/commands/insert-trip/insert-trip.controller';
import {
  DELETE_TRIP_HANDLER,
  FIND_TRIP_BY_ID_HANDLER,
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
import { DeleteTripHandlerImpl } from './use-cases/commands/delete-trip/delete-trip.handler';
import { UpdateTripController } from './use-cases/commands/update-trip/update-trip.controller';
import { DeleteTripController } from './use-cases/commands/delete-trip/delete-trip.controller';
import { FindTripByIdHandlerImpl } from './use-cases/queries/find-trip-by-id/find-trip-by-id.handler';
import { FindTripByIdController } from './use-cases/queries/find-trip-by-id/find-trip-by-id.controller';

@Module({
  controllers: [
    InsertTripController,
    ListTripController,
    UpdateTripController,
    DeleteTripController,
    FindTripByIdController,
  ],
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
    {
      provide: DELETE_TRIP_HANDLER,
      useClass: DeleteTripHandlerImpl,
    },
    {
      provide: FIND_TRIP_BY_ID_HANDLER,
      useClass: FindTripByIdHandlerImpl,
    },
  ],
  exports: [TRIP_REPOSITORY],
})
export class TripModule {}
