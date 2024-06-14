import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TripModule } from './trips/trip.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { DatabaseModule } from './connections/database/database.module';
import 'dotenv/config';
import { TransactionModule } from './transactions/transaction.module';
import { CountryModule } from './countries/country.module';
import { CustomerModule } from './customers/customer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthenticationMiddleware } from './middleware/authentication/authentication.middleware';

@Module({
  imports: [
    DatabaseModule.forRoot({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    }),
    TripModule,
    TransactionModule,
    CountryModule,
    CustomerModule,
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '../../images/trip-picture'),
        serveRoot: '/trip/',
      },
      {
        rootPath: join(__dirname, '../../images/customer-avatar'),
        serveRoot: '/avatar/',
      },
      {
        rootPath: join(__dirname, '../../images/payment-proof'),
        serveRoot: '/proof/',
      },
    ),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: 'trips', method: RequestMethod.GET },
        { path: 'customers', method: RequestMethod.POST },
      )
      .forRoutes('customers', 'countries', 'trips', 'transactions');
  }
}
