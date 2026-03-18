import { Global, Module } from '@nestjs/common';
import { ITransactionManager, TransactionManager } from './TransactionManager';

@Global()
@Module({
  providers: [
    {
      provide: ITransactionManager,
      useClass: TransactionManager,
    },
  ],
  exports: [
    {
      provide: ITransactionManager,
      useClass: TransactionManager,
    },
  ],
})
export class TransactionModule { }
