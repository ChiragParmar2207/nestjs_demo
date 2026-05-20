import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { MESSAGES } from '../../constants/messages.constants';

type ControllerResponse = {
  message?: string;
  data?: unknown;
  [key: string]: unknown;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
};

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<unknown>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<unknown>> {
    return next.handle().pipe(map((response) => this.formatResponse(response)));
  }

  private formatResponse(response: unknown): ApiResponse<unknown> {
    if (this.isFormattedResponse(response)) {
      return response;
    }

    if (this.isObjectResponse(response)) {
      const { message, data, ...rest } = response;

      return {
        success: true,
        message: message ?? MESSAGES.SUCCESS,
        data: data ?? this.getResponseData(rest),
        errors: [],
      };
    }

    return {
      success: true,
      message: MESSAGES.SUCCESS,
      data: response ?? {},
      errors: [],
    };
  }

  private getResponseData(response: Record<string, unknown>): unknown {
    return Object.keys(response).length ? response : {};
  }

  private isObjectResponse(response: unknown): response is ControllerResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      !Array.isArray(response)
    );
  }

  private isFormattedResponse(
    response: unknown,
  ): response is ApiResponse<unknown> {
    return (
      this.isObjectResponse(response) &&
      'success' in response &&
      'message' in response &&
      'data' in response &&
      'errors' in response
    );
  }
}
