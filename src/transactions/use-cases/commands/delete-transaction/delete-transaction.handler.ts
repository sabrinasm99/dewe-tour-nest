import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  DeleteTransactionDTORequest,
  DeleteTransactionDTORequestSchema,
} from './delete-transaction.dto.request';
import { TransactionRepository } from 'src/transactions/repositories/transaction.repository';
import { unlink } from 'fs/promises';
import {
  paymentImagesDir,
  TRANSACTION_REPOSITORY,
} from 'src/transactions/transaction.constants';

export interface DeleteTransactionHandler {
  execute(params: DeleteTransactionDTORequest): Promise<void>;
}

@Injectable()
export class DeleteTransactionHandlerImpl implements DeleteTransactionHandler {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: TransactionRepository,
  ) {}

  async execute(params: DeleteTransactionDTORequest) {
    params = DeleteTransactionDTORequestSchema.parse(params);

    const transaction = await this.transactionRepo.findById(params.id);

    if (!transaction) {
      throw new NotFoundException('Transaction is not found');
    }

    const { attachment } = transaction.getProps();

    let filePath;
    if (attachment) {
      filePath = `${paymentImagesDir}/${attachment}`;
    }

    await this.transactionRepo.delete(params.id);

    if (filePath) {
      await unlink(filePath);
    }
  }
}
