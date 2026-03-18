import { HttpStatus } from '@nestjs/common';
import { NODE_ENV, RESPONSE_STATUS_CODE } from '../constants';
import {
  ErrorModel,
  ForbiddenErrorModel,
  ResourceAlreadyExistsErrorModel,
  ResourceNotFoundErrorModel,
  UnAuthorizedErrorModel,
  ValidationFailedErrorModel,
} from '../types/error.type';
import { PagedList } from '../types/pagedList.type';

export class ResponseFactory {
  public static createResponse<T>(
    result: any,
    successMessage?: string,
    code?: number,
    environment?: any
  ) {
    if (result instanceof ErrorModel) {
      const stack = result.error && result.error.stack;
      const errorCode = code || this.getErrorHttpStatusCode(result);

      const response = this.getErrorResponse(
        result.name,
        result.message,
        errorCode,
        stack
      );

      return response;
    } else {
      const response = this.getSuccessResponse(
        successMessage || 'Success',
        code || RESPONSE_STATUS_CODE.SUCCESS,
        result
      );

      return response;
    }
  }

  private static getErrorHttpStatusCode(error: ErrorModel) {
    if (error instanceof ValidationFailedErrorModel) {
      return HttpStatus.BAD_REQUEST;
    } else if (error instanceof ResourceNotFoundErrorModel) {
      return HttpStatus.NOT_FOUND;
    } else if (error instanceof UnAuthorizedErrorModel) {
      return HttpStatus.UNAUTHORIZED;
    } else if (error instanceof ForbiddenErrorModel) {
      return HttpStatus.FORBIDDEN;
    } else if (error instanceof ResourceAlreadyExistsErrorModel) {
      return HttpStatus.CONFLICT;
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private static getErrorResponse(
    errorName: string,
    errorMessage: string,
    errorCode: number,
    stack?: any,
    environment?: any
  ) {
    const errorResponse = {
      status: false,
      message: errorMessage,
      code: errorCode,
      error: {
        name: errorName,
        message: errorMessage,
        code: errorCode,
        stack: stack,
      },
      data: null,
    };

    if (environment !== NODE_ENV.DEVELOPMENT) {
      delete errorResponse.error.stack;
    }

    return errorResponse;
  }

  private static getSuccessResponse(
    successMessage: string,
    code: number,
    result: any
  ) {
    let response = {
      status: true,
      message: successMessage,
      code,
    };

    if (result instanceof PagedList) {
      response['data'] = result.data;
      response['meta'] = {
        totalCount: result.totalCount,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        limit: result.limit,
      };
    } else {
      response['data'] = result;
    }

    return response;
  }
}
