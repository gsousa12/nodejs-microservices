import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GENERIC_MESSAGES } from '@orangepay/consts';
import { RESPONSE_MESSAGE_KEY } from '../decorators';
import { ApiResponse } from '@orangepay/types';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const message = this.getResponseMessage(context);

    return next.handle().pipe(map((data: T) => this.buildSuccessResponse(data, message)));
  }

  private getResponseMessage(context: ExecutionContext): string {
    const defaultSuccessMessage = GENERIC_MESSAGES.SUCCESS_OPERATION;
    return (
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? defaultSuccessMessage
    );
  }

  private buildSuccessResponse(data: T, message: string): ApiResponse<T> {
    const hasData = data !== undefined && data !== null;
    return {
      success: true,
      message,
      data: hasData ? data : undefined,
    } as ApiResponse<T>;
  }
}
