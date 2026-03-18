import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from '../constants';
import { INTERNAL_SERVER_ERROR } from '../constants/message';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(public configService?: ConfigService) { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const errorResponse = exception.getResponse() as any;
        const errorMessage =
            typeof errorResponse.message === 'string'
                ? [errorResponse.message]
                : errorResponse.message;

        const environment =
            this.configService?.get<string>('NODE_ENV') || NODE_ENV.PRODUCTION

        response.status(status).json({
            status: false,
            code: status,
            message: exception.message || INTERNAL_SERVER_ERROR,
            error: {
                name: exception.name || 'HttpException',
                message: errorMessage,
                code: status,
                stack: environment === NODE_ENV.DEVELOPMENT ? exception.stack : null,
            },
            data: null
        });
    }
}
