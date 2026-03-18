import { Injectable, Logger } from '@nestjs/common';
import { merge } from 'lodash';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { TX } from './Constants';
import { TransactionContext } from './TransactionContext';
import { TransactionRollbackError } from './TransactionRollbackError';
import { ErrorModel } from '../../../common/types/error.type';
import { AppContext } from '../../../common/utils/interfaces/context.interface';

export enum TRANSACTION_PROPAGATION {
  REQUIRED = 'REQUIRED', // Uses tranasction if active otherwise creates one
  MANDATORY = 'MANDATORY', // Uses transaction if active otherwise throws an exception
}

const defaultTransactionOptions: TransactionOption = {
  propagation: TRANSACTION_PROPAGATION.REQUIRED,
};

export interface TransactionOption {
  propagation: TRANSACTION_PROPAGATION;
}

export const ITransactionManager = Symbol('ITransactionManager');

export interface ITransactionManager {
  useTransaction<T>(
    context: AppContext,
    callback: (context: AppContext) => Promise<T | ErrorModel>,
    options?: TransactionOption
  ): Promise<T | ErrorModel>;
}

let _transactionManagerSingleton: ITransactionManager = null;

@Injectable()
export class TransactionManager implements ITransactionManager {
  constructor(private readonly dataSource: DataSource) {
    _transactionManagerSingleton = this;
  }

  async useTransaction<T>(
    context: AppContext,
    callback: (context: AppContext) => Promise<T | ErrorModel>,
    options?: TransactionOption
  ): Promise<T | ErrorModel> {
    let txContext: TransactionContext = context.tx;
    let hasTxCreated = false;
    const opts = merge({}, defaultTransactionOptions, options);

    try {
      if (!txContext) {
        Logger.log(
          'Going to create a new Lazy Initializeable Transaction for the context'
        );

        if (opts.propagation === TRANSACTION_PROPAGATION.MANDATORY) {
          throw new Error(
            `Transaction is required due to propagation strategy: '${opts.propagation}'`
          );
        }

        txContext = new TransactionContext(this.dataSource);
        context[TX] = txContext;
        hasTxCreated = true;

        Logger.log(
          'Lazy Initializeable Transaction created successfully for the context'
        );
        await txContext.begin()
      } else {
        Logger.log(
          'Transaction exists in the context, will continue to use that'
        );
      }

      const data = await callback(context);

      if (hasTxCreated) {
        if (
          data instanceof ErrorModel
        ) {
          await txContext.rollback(data);
        } else {
          await txContext.commit();
        }
      }
      return data;
    } catch (e) {
      Logger.log('Transaction disturbed due to following error: ' + e);
      if (hasTxCreated) {
        await txContext.rollback(e);
      }

      if (!(e instanceof TransactionRollbackError)) {
        throw e;
      }
    } finally {
      if (hasTxCreated) {
        delete context[TX];
        await txContext.release();
      }
    }
  }
}

/**
 * This is a decorator which can be used to make any method transactional
 * @example
 * @Transactional()
 * methodAbc(): Promise<any> {}
 * @async
 * @method
 * @param options TransactionOption
 * @returns
 */
export function Transactional(options?: TransactionOption) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const actualFunction = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<any> {
      if (args.length > 0 && args[0] instanceof AppContext) {
        return _transactionManagerSingleton.useTransaction(
          args[0],
          async (ctx) => {
            args[0] = ctx; // replacing the context
            // Call the actual function
            return actualFunction.apply(this, args);
          },
          options
        );
      } else {
        throw new Error(
          'Transactional function must have AppContext as the first parameter'
        );
      }
    };
  };
}
