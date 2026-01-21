// common/interceptors/transform-response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@orangepay/types';
import { RESPONSE_MESSAGE_KEY } from '../decorators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const message =
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || 'Operação realizada com sucesso';

    return next.handle().pipe(
      map(
        (data) =>
          ({
            success: true,
            message: message,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: data,
          }) as unknown as ApiResponse<T>,
      ),
    );
  }
}
