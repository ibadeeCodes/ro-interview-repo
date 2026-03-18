import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../constants';

export const ROLE_KEY = 'roles';

export const Roles = (...role: ROLE[]) => SetMetadata(ROLE_KEY, role);