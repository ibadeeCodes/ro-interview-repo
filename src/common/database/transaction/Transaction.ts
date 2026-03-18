import { Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

export interface ITransaction {
  begin(): void;
  commit(): void;
  rollback(e: any): void;
  release(): void;
  get QueryRunner(): QueryRunner;
}

export class Transaction implements ITransaction {
  constructor(
    private readonly queryRunner: QueryRunner
  ) { }

  async begin() {
    Logger.log('Going to initiate the transaction');
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
    Logger.log('Transaction initiated successfully');
  }

  async commit() {
    Logger.log('Going to commit the transaction for the context');
    await this.queryRunner.commitTransaction();
    Logger.log('Transaction committed successfully for the context');
  }

  async rollback(e: any) {
    Logger.log(
      'Going to rollback the transaction for the context due to following error: ' +
      JSON.stringify(e)
    );
    await this.queryRunner.rollbackTransaction();
    Logger.log(
      'Transaction rollbacked successfully for the context due to following error: ' +
      JSON.stringify(e)
    );
  }

  async release() {
    Logger.log('Going to release the transaction for the context');
    await this.queryRunner.release();
    Logger.log('Transaction released successfully for the context');
  }

  get QueryRunner(): QueryRunner {
    return this.queryRunner;
  }
}
