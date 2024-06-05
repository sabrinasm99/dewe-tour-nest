import { Module } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  DELETE_CUSTOMER_HANDLER,
  INSERT_CUSTOMER_HANDLER,
  LIST_CUSTOMER_HANDLER,
  LOGIN_CUSTOMER_HANDLER,
  UPDATE_CUSTOMER_HANDLER,
} from './customer.constants';
import { CustomerPgRepository } from './repositories/implementations/customer.pg.impl.repository';
import { InsertCustomerHandlerImpl } from './use-cases/commands/insert-customer/insert-customer.handler';
import { InsertCustomerController } from './use-cases/commands/insert-customer/insert-customer.controller';
import { ListCustomerHandlerImpl } from './use-cases/queries/list-customer/list-customer.handler';
import { UpdateCustomerHandlerImpl } from './use-cases/commands/update-customer/update-customer.handler';
import { UpdateCustomerController } from './use-cases/commands/update-customer/update-customer.controller';
import { DeleteCustomerController } from './use-cases/commands/delete-customer/delete-customer.controller';
import { DeleteCustomerHandlerImpl } from './use-cases/commands/delete-customer/delete-customer.handler';
import { ListCustomerController } from './use-cases/queries/list-customer/list-customer.controller';
import { LoginCustomerHandlerImpl } from './use-cases/commands/login-customer/login-customer.handler';
import { LoginCustomerController } from './use-cases/commands/login-customer/login-customer.controller';

@Module({
  controllers: [
    InsertCustomerController,
    UpdateCustomerController,
    DeleteCustomerController,
    ListCustomerController,
    LoginCustomerController,
  ],
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
    {
      provide: DELETE_CUSTOMER_HANDLER,
      useClass: DeleteCustomerHandlerImpl,
    },
    {
      provide: LOGIN_CUSTOMER_HANDLER,
      useClass: LoginCustomerHandlerImpl,
    },
  ],
})
export class CustomerModule {}
