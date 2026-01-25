import { TransformResponseInterceptor } from 'src/_common/interceptors';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/_common/filters';
import { Provider } from '@nestjs/common';

export const globalProviders: Provider[] = [
  // Interceptors
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ZodSerializerInterceptor,
  },

  // Pipes
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },

  // Filters
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },
];
