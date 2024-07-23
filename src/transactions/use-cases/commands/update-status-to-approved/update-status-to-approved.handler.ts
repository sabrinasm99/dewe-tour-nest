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
import { UnitOfWorkTransactionTrip } from 'src/unit-of-work/uow-transaction-trip';

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
    private unitOfWork: UnitOfWorkTransactionTrip,
  ) {}

  async execute(params: UpdateStatusToApprovedDTORequest) {
    params = UpdateStatusToApprovedDTORequestSchema.parse(params);

    const transaction = await this.transactionRepo.findById(params.id);

    if (!transaction) {
      throw new NotFoundException('Transaction is not found');
    }

    transaction.updateStatus(STATUS.APPROVED);

    const uowFactory = await this.unitOfWork.start();
    const { trip_id, quantity } = transaction.getProps();

    try {
      await uowFactory.transactionPgRepository.update(transaction);

      const trip = await uowFactory.tripPgRepository.findById(trip_id);
      trip.updateBookedSlots(quantity);

      await uowFactory.tripPgRepository.update(trip);

      uowFactory.commit();
    } catch (error) {
      await uowFactory.rollback();
      throw error;
    } finally {
      uowFactory.release();
    }

    return transaction;
  }
}
