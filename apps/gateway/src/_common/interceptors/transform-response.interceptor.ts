import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { RESPONSE_MESSAGE_KEY } from '../decorators';
import { ApiResponse } from '@orangepay/types';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  private readonly defaultMessage = 'Operação realizada com sucesso';

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const message = this.getResponseMessage(context);

    return next.handle().pipe(map((data: T) => this.buildSuccessResponse(data, message)));
  }

  private getResponseMessage(context: ExecutionContext): string {
    return (
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? this.defaultMessage
    );
  }

  private buildSuccessResponse(data: T, message: string): ApiResponse<T> {
    return {
      success: true,
      message,
      ...(data !== undefined && data !== null && { data }),
    } as ApiResponse<T>;
  }
}
