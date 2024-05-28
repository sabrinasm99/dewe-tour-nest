import { Module } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  INSERT_CUSTOMER_HANDLER,
} from './customer.constants';
import { CustomerPgRepository } from './repositories/implementations/customer.pg.impl.repository';
import { InsertCustomerHandlerImpl } from './use-cases/commands/insert-customer/insert-customer.handler';
import { InsertCustomerController } from './use-cases/commands/insert-customer/insert-customer.controller';

@Module({
  controllers: [InsertCustomerController],
  providers: [
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerPgRepository },
    {
      provide: INSERT_CUSTOMER_HANDLER,
      useClass: InsertCustomerHandlerImpl,
    },
  ],
})
export class CustomerModule {}
