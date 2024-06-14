import {
  STATUS,
  Transaction,
} from 'src/transactions/domain/transaction.domain';
import { TransactionRepository } from 'src/transactions/repositories/transaction.repository';
import {
  UpdateStatusToApprovedDTORequest,
  UpdateStatusToApprovedDTORequestSchema,
} from './update-status-to-approved.dto.request';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/transactions/transaction.constants';

export interface UpdateStatusToApprovedHandler {
  execute(params: UpdateStatusToApprovedDTORequest): Promise<Transaction>;
}

@Injectable()
export class UpdateStatusToApprovedHandlerImpl
  implements UpdateStatusToApprovedHandler
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: TransactionRepository,
  ) {}

  async execute(params: UpdateStatusToApprovedDTORequest) {
    params = UpdateStatusToApprovedDTORequestSchema.parse(params);

    const transaction = await this.transactionRepo.findById(params.id);

    if (!transaction) {
      throw new NotFoundException('Transaction is not found');
    }

    transaction.updateStatus(STATUS.APPROVED);

    await this.transactionRepo.update(transaction);

    return transaction;
  }
}
