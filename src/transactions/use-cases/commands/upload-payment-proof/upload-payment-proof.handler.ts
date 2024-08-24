import { Transaction } from 'src/transactions/domain/transaction.domain';
import {
  UploadPaymentProofDTORequest,
  UploadPaymentProofDTORequestSchema,
} from './upload-payment-proof.dto.request';
import { TransactionRepository } from 'src/transactions/repositories/transaction.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  paymentImagesDir,
  TRANSACTION_REPOSITORY,
} from 'src/transactions/transaction.constants';
import { unlink, writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

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
      throw new NotFoundException('Transaction is not found');
    }

    let oldPath;
    const { attachment } = transaction.getProps();

    if (attachment) {
      oldPath = `${paymentImagesDir}/${attachment}`;
    }

    const newPath = `${paymentImagesDir}/${params.attachment_filename}`;

    transaction.updateAttachment(params.attachment_filename);

    await this.transactionRepo.update(transaction);

    if (!existsSync(paymentImagesDir)) {
      mkdirSync(paymentImagesDir, { recursive: true });
    }

    if (oldPath) {
      await unlink(oldPath);
    }

    await writeFile(newPath, params.attachment_buffer);

    return transaction;
  }
}
