import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { NODE_ENV } from '../constants';
import { CustomError, ErrorModel } from '../types/error.type';
import { ResponseFactory } from './ResponseFactory';

@Controller()
export class BaseController {
  constructor(public configService?: ConfigService) {}

  sendResponse<T>({
    result,
    res,
    successMessage,
    code,
  }: {
    result: any;
    res: Response;
    successMessage?: string;
    code?: number; // instead of sending code here on error, use specific Error Model class (ResouceNotFoundErrorModel etc)
  }) {
    const environment =
      this.configService?.get<string>('NODE_ENV') || NODE_ENV.PRODUCTION;

    const response = ResponseFactory.createResponse(
      result,
      successMessage,
      code,
      environment
    );

    return res.status(response.code).send(response);
  }
}
