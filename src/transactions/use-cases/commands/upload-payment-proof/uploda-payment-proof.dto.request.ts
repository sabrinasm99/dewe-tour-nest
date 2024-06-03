import { Transaction } from 'src/transactions/domain/transaction.domain';
import {
  UploadPaymentProofDTORequest,
  UploadPaymentProofDTORequestSchema,
} from './upload-payment-proof.handler';
import { TransactionRepository } from 'src/transactions/repositories/transaction.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/transactions/transaction.constants';

export interface UploadPaymentProofHandler {
  execute(params: UploadPaymentProofDTORequest): Promise<Transaction>;
}

@Injectable()
export class UploadPaymentProofHandlerImpl
  implements UploadPaymentProofHandler
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepo: TransactionRepository,
  ) {}

  async execute(params: UploadPaymentProofDTORequest) {
    params = UploadPaymentProofDTORequestSchema.parse(params);

    const transaction = await this.transactionRepo.findById(params.id);

    if (!transaction) {
      throw new Error('Transaction is not found');
    }

    transaction.updateAttachment(params.attachment);

    await this.transactionRepo.update(transaction);

    return transaction;
  }
}
