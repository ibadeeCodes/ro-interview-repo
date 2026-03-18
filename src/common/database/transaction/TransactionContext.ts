import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ITransaction, Transaction } from './Transaction';

export class TransactionContext {
  private transaction: ITransaction;
  dataSource: DataSource

  constructor(
    data_source: DataSource
  ) {
    this.dataSource = data_source
  }

  async begin() {

    const queryRunner = this.dataSource.createQueryRunner();

    this.transaction = new Transaction(queryRunner);
    await this.transaction.begin();
    Logger.log('Actual Transaction initialized successfully');
  }

  async commit() {
    await this.transaction.commit();
  }

  async rollback(e) {
    await this.transaction.rollback(e);
  }

  async release() {
    await this.transaction.release();
  }

  get Transaction(): ITransaction {
    return this.transaction;
  }
}
