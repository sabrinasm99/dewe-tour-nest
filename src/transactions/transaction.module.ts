import { Module } from '@nestjs/common';
import {
  INSERT_TRANSACTION_HANDLER,
  TRANSACTION_REPOSITORY,
} from './transaction.constants';
import { InsertTransactionHandlerImpl } from './use-cases/commands/insert-transaction/insert-transaction.handler';
import { TransactionPgRepository } from './repositories/implementations/transaction.pg.impl.repository';
import { InsertTransactionController } from './use-cases/commands/insert-transaction/insert-transaction.controller';

@Module({
  controllers: [InsertTransactionController],
  providers: [
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionPgRepository,
    },
    {
      provide: INSERT_TRANSACTION_HANDLER,
      useClass: InsertTransactionHandlerImpl,
    },
  ],
})
export class TransactionModule {}
