import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { MESSAGES } from '../../constants/messages.constants';
import { ApiResponse } from '../interceptors/apiResponse.interceptor';

type ExceptionResponse = {
  message?: string | string[];
  error?: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getStatus(exception);
    const errors = this.getErrors(exception);
    const message = this.getMessage(exception, errors);

    response.status(status).json({
      success: false,
      message,
      data: {},
      errors,
    } satisfies ApiResponse<Record<string, never>>);
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrors(exception: unknown): string[] {
    if (!(exception instanceof HttpException)) {
      return [MESSAGES.SOMETHING_WENT_WRONG];
    }

    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      return [exceptionResponse];
    }

    if (this.isExceptionResponse(exceptionResponse)) {
      const { message, error } = exceptionResponse;

      if (Array.isArray(message)) {
        return message;
      }

      if (message) {
        return [message];
      }

      if (error) {
        return [error];
      }
    }

    return [exception.message];
  }

  private getMessage(exception: unknown, errors: string[]): string {
    if (!(exception instanceof HttpException)) {
      return MESSAGES.SOMETHING_WENT_WRONG;
    }

    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (this.isExceptionResponse(exceptionResponse)) {
      if (Array.isArray(exceptionResponse.message)) {
        return MESSAGES.VALIDATION_FAILED;
      }

      if (exceptionResponse.message) {
        return exceptionResponse.message;
      }
    }

    return errors[0] ?? MESSAGES.SOMETHING_WENT_WRONG;
  }

  private isExceptionResponse(
    response: unknown,
  ): response is ExceptionResponse {
    return typeof response === 'object' && response !== null;
  }
}
