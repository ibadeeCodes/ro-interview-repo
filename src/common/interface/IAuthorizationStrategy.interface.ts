import { ExecutionContext } from '@nestjs/common';

export interface IAuthorizationStrategy {
  canActivate(context: ExecutionContext): Promise<boolean>;
}
