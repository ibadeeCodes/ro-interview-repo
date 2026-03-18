import { Injectable } from '@nestjs/common';
import { API_LAUNCH_MESSAGE } from './common/constants';

@Injectable()
export class AppService {
  getHello(): string {
    return API_LAUNCH_MESSAGE;
  }
}
