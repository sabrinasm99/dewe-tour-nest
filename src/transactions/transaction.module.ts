import { Module } from '@nestjs/common';
import {
  DELETE_TRANSACTION_HANDLER,
  INSERT_TRANSACTION_HANDLER,
  LIST_TRANSACTION_HANDLER,
  TRANSACTION_REPOSITORY,
  UPDATE_STATUS_TO_APPROVED_HANDLER,
  UPDATE_STATUS_TO_WAITING_APPROVE_HANDLER,
  UPLOAD_PAYMENT_PROOF_HANDLER,
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
import { UploadPaymentProofController } from './use-cases/commands/upload-payment-proof/upload-payment-proof.controller';
import { UploadPaymentProofHandlerImpl } from './use-cases/commands/upload-payment-proof/upload-payment-proof.handler';
import { DeleteTransactionController } from './use-cases/commands/delete-transaction/delete-transaction.controller';
import { DeleteTransactionHandlerImpl } from './use-cases/commands/delete-transaction/delete-transaction.handler';

@Module({
  controllers: [
    InsertTransactionController,
    UpdateStatusToWaitingApproveController,
    UpdateStatusToApprovedController,
    ListTransactionController,
    UploadPaymentProofController,
    DeleteTransactionController,
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
    {
      provide: UPLOAD_PAYMENT_PROOF_HANDLER,
      useClass: UploadPaymentProofHandlerImpl,
    },
    {
      provide: DELETE_TRANSACTION_HANDLER,
      useClass: DeleteTransactionHandlerImpl,
    },
  ],
})
export class TransactionModule {}
