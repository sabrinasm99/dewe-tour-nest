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
import { CheckAdminMiddleware } from './middleware/authentication/check-admin.middleware';
import { ListCustomerController } from './customers/use-cases/queries/list-customer/list-customer.controller';
import { ListCountryController } from './countries/use-cases/queries/list-country/list-country.controller';
import { InsertCountryController } from './countries/use-cases/commands/insert-country/insert-country.controller';
import { InsertTripController } from './trips/use-cases/commands/insert-trip/insert-trip.controller';
import { UpdateTripController } from './trips/use-cases/commands/update-trip/update-trip.controller';
import { DeleteTripController } from './trips/use-cases/commands/delete-trip/delete-trip.controller';
import { UpdateStatusToApprovedController } from './transactions/use-cases/commands/update-status-to-approved/update-status-to-approved.controller';
import { DeleteTransactionController } from './transactions/use-cases/commands/delete-transaction/delete-transaction.controller';
import { UpdateCustomerController } from './customers/use-cases/commands/update-customer/update-customer.controller';
import { DeleteCustomerController } from './customers/use-cases/commands/delete-customer/delete-customer.controller';
import { InsertTransactionController } from './transactions/use-cases/commands/insert-transaction/insert-transaction.controller';
import { UploadPaymentProofController } from './transactions/use-cases/commands/upload-payment-proof/upload-payment-proof.controller';
import { UpdateStatusToWaitingApproveController } from './transactions/use-cases/commands/update-status-to-waiting-approve/update-status-to-waiting-approve.controller';
import { ListTransactionByCustomerController } from './transactions/use-cases/queries/list-transaction-by-customer/list-transaction-by-customer.controller';
import { FindTransactionByIdController } from './transactions/use-cases/queries/find-transaction-by-id/find-transaction-by-id.controller';
import { FindCustomerByIdController } from './customers/use-cases/queries/find-customer-by-id/find-customer-by-id.controller';
import { FindTripByIdController } from './trips/use-cases/queries/find-trip-by-id/find-trip-by-id.controller';

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
      .forRoutes(
        UpdateCustomerController,
        DeleteCustomerController,
        InsertTransactionController,
        UploadPaymentProofController,
        UpdateStatusToWaitingApproveController,
        ListTransactionByCustomerController,
        FindTransactionByIdController,
        FindCustomerByIdController,
        FindTripByIdController,
      );

    consumer
      .apply(AuthenticationMiddleware, CheckAdminMiddleware)
      .forRoutes(
        ListCustomerController,
        ListCountryController,
        InsertCountryController,
        InsertTripController,
        UpdateTripController,
        DeleteTripController,
        UpdateStatusToApprovedController,
        DeleteTransactionController,
      );
  }
}
