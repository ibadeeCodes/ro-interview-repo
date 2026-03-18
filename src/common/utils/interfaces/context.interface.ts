import { ROLE } from "src/common/constants";
import { TransactionContext } from "src/common/database/transaction/TransactionContext";
export interface Context {
  [key: string]: any;
}
export interface ApplicationContext extends Context {
  get UserID(): number;
  get Role(): ROLE
  get Token(): string
  get PartnerId(): number
}
export class AppContext implements ApplicationContext {
  private readonly userId: number;
  private readonly role: ROLE
  private readonly token: string;
  private readonly partnerId: number;
  public tx: TransactionContext

  public constructor(userId?: number, role?: ROLE, token?: string, TX?: TransactionContext, partnerId?: number) {
    this.userId = userId;
    this.role = role
    this.token = token;
    this.tx = TX
    this.partnerId = partnerId
  }

  get UserID(): number {
    return this.userId;
  }

  get Role(): ROLE {
    return this.role;
  }

  get Token(): string {
    return this.token;
  }

  get PartnerId(): number {
    return this.partnerId;
  }
}
