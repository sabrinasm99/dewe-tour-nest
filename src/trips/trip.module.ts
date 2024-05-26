import { Module } from '@nestjs/common';
import { InsertTripController } from './use-cases/commands/insert-trip/insert-trip.controller';
import { INSERT_TRIP_HANDLER, TRIP_REPOSITORY } from './trip.constants';
import { TripPgRepository } from './repositories/implementations/trip.pg.impl.repository';
import { InsertTripHandlerImpl } from './use-cases/commands/insert-trip/insert-trip.handler';

@Module({
  controllers: [InsertTripController],
  providers: [
    {
      provide: TRIP_REPOSITORY,
      useClass: TripPgRepository,
    },
    {
      provide: INSERT_TRIP_HANDLER,
      useClass: InsertTripHandlerImpl,
    },
  ],
})
export class TripModule {}
