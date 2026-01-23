import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { RESPONSE_MESSAGE_KEY } from '../decorators';
import { ApiResponse } from '@orangepay/types';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const message =
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || 'Operação realizada com sucesso';

    return next.handle().pipe(
      map(
        (data: T) =>
          ({
            success: true,
            message: message,
            data: data,
          }) as ApiResponse<T>,
      ),
    );
  }
}
