import {
  STATUS,
  Transaction,
} from 'src/transactions/domain/transaction.domain';
import { TransactionRepository } from 'src/transactions/repositories/transaction.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UpdateStatusToWaitingApproveDTORequest,
  UpdateStatusToWaitingApproveDTORequestSchema,
} from './update-status-to-waiting-approve.dto.request';
import { TRANSACTION_REPOSITORY } from 'src/transactions/transaction.constants';

export interface UpdateStatusToWaitingApproveHandler {
  execute(params: UpdateStatusToWaitingApproveDTORequest): Promise<Transaction>;
}

@Injectable()
export class UpdateStatusToWaitingApproveHandlerImpl
  implements UpdateStatusToWaitingApproveHandler
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: TransactionRepository,
  ) {}

  async execute(params: UpdateStatusToWaitingApproveDTORequest) {
    params = UpdateStatusToWaitingApproveDTORequestSchema.parse(params);

    const transaction = await this.transactionRepo.findById(params.id);

    if (!transaction) {
      throw new NotFoundException('Transaction is not found');
    }

    transaction.updateStatus(STATUS.WAITING_APPROVE);

    await this.transactionRepo.update(transaction);

    return transaction;
  }
}
