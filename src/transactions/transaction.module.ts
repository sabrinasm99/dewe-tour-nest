import { Module } from '@nestjs/common';
import {
  INSERT_TRANSACTION_HANDLER,
  TRANSACTION_REPOSITORY,
  UPDATE_STATUS_TO_WAITING_APPROVE_HANDLER,
} from './transaction.constants';
import { InsertTransactionHandlerImpl } from './use-cases/commands/insert-transaction/insert-transaction.handler';
import { TransactionPgRepository } from './repositories/implementations/transaction.pg.impl.repository';
import { InsertTransactionController } from './use-cases/commands/insert-transaction/insert-transaction.controller';
import { UpdateStatusToWaitingApproveHandlerImpl } from './use-cases/commands/update-status-to-waiting-approve/update-status-to-waiting-approve.handler';
import { UpdateStatusToWaitingApproveController } from './use-cases/commands/update-status-to-waiting-approve/update-status-to-waiting-approve.controller';

@Module({
  controllers: [
    InsertTransactionController,
    UpdateStatusToWaitingApproveController,
  ],
  providers: [
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionPgRepository,
    },
    {
      provide: INSERT_TRANSACTION_HANDLER,
      useClass: InsertTransactionHandlerImpl,
    },
    {
      provide: UPDATE_STATUS_TO_WAITING_APPROVE_HANDLER,
      useClass: UpdateStatusToWaitingApproveHandlerImpl,
    },
  ],
})
export class TransactionModule {}
