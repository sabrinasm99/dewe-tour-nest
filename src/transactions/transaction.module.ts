import { Module } from '@nestjs/common';
import {
  INSERT_TRANSACTION_HANDLER,
  LIST_TRANSACTION_HANDLER,
  TRANSACTION_REPOSITORY,
  UPDATE_STATUS_TO_APPROVED_HANDLER,
  UPDATE_STATUS_TO_WAITING_APPROVE_HANDLER,
} from './transaction.constants';
import { InsertTransactionHandlerImpl } from './use-cases/commands/insert-transaction/insert-transaction.handler';
import { TransactionPgRepository } from './repositories/implementations/transaction.pg.impl.repository';
import { InsertTransactionController } from './use-cases/commands/insert-transaction/insert-transaction.controller';
import { UpdateStatusToWaitingApproveHandlerImpl } from './use-cases/commands/update-status-to-waiting-approve/update-status-to-waiting-approve.handler';
import { UpdateStatusToWaitingApproveController } from './use-cases/commands/update-status-to-waiting-approve/update-status-to-waiting-approve.controller';
import { UpdateStatusToApprovedHandlerImpl } from './use-cases/commands/update-status-to-approved/update-status-to-approved.handler';
import { UpdateStatusToApprovedController } from './use-cases/commands/update-status-to-approved/update-status-to-approved.controller';
import { ListTransactionHandlerImpl } from './use-cases/queries/list-transaction/list-transaction.handler';
import { ListTransactionController } from './use-cases/queries/list-transaction/list-transaction.controller';

@Module({
  controllers: [
    InsertTransactionController,
    UpdateStatusToWaitingApproveController,
    UpdateStatusToApprovedController,
    ListTransactionController,
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
    {
      provide: UPDATE_STATUS_TO_APPROVED_HANDLER,
      useClass: UpdateStatusToApprovedHandlerImpl,
    },
    {
      provide: LIST_TRANSACTION_HANDLER,
      useClass: ListTransactionHandlerImpl,
    },
  ],
})
export class TransactionModule {}
