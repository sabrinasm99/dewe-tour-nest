import { Module } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  INSERT_CUSTOMER_HANDLER,
  LIST_CUSTOMER_HANDLER,
  UPDATE_CUSTOMER_HANDLER,
} from './customer.constants';
import { CustomerPgRepository } from './repositories/implementations/customer.pg.impl.repository';
import { InsertCustomerHandlerImpl } from './use-cases/commands/insert-customer/insert-customer.handler';
import { InsertCustomerController } from './use-cases/commands/insert-customer/insert-customer.controller';
import { ListCustomerHandlerImpl } from './use-cases/queries/list-customer/list-customer.handler';
import { UpdateCustomerHandlerImpl } from './use-cases/commands/update-customer/update-customer.handler';

@Module({
  controllers: [InsertCustomerController],
  providers: [
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerPgRepository },
    {
      provide: INSERT_CUSTOMER_HANDLER,
      useClass: InsertCustomerHandlerImpl,
    },
    {
      provide: LIST_CUSTOMER_HANDLER,
      useClass: ListCustomerHandlerImpl,
    },
    {
      provide: UPDATE_CUSTOMER_HANDLER,
      useClass: UpdateCustomerHandlerImpl,
    },
  ],
})
export class CustomerModule {}
