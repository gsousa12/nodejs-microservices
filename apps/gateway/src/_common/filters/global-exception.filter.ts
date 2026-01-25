/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@orangepay/types';
import { GENERIC_MESSAGES } from '@orangepay/consts';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(GlobalExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.getStatus(exception);
    const message = this.getMessage(exception);

    const isZodException = exception instanceof ZodValidationException;

    if (!isZodException) {
      this.logger.error(
        {
          exception: exception instanceof Error ? exception.stack : exception,
          status,
        },
        `${message}`,
      );
    }

    const errorResponse: ApiResponse = {
      success: false,
      message,
    };

    response.status(status).json(errorResponse);
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof ZodValidationException) {
      return this.getZodMessage(exception);
    }

    if (exception instanceof HttpException) {
      return this.getHttpMessage(exception);
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return GENERIC_MESSAGES.INTERNAL_SERVER_ERROR as string;
  }

  private getZodMessage(exception: ZodValidationException): string {
    const zodError = exception.getZodError();
    const firstIssue = (zodError as any).issues[0];

    return firstIssue?.message ?? (GENERIC_MESSAGES.VALIDATION_ERROR as string);
  }

  private getHttpMessage(exception: HttpException): string {
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    if (this.isObjectWithMessage(response)) {
      const { message } = response;
      return Array.isArray(message) ? message.join(', ') : message;
    }

    return GENERIC_MESSAGES.INTERNAL_SERVER_ERROR as string;
  }

  private isObjectWithMessage(value: unknown): value is { message: string | string[] } {
    const isObject = typeof value === 'object';

    const isNonNullValue = value !== null;

    const hasMessageProperty = 'message' in (value as object);

    const hasValidMessageType =
      typeof (value as { message: unknown }).message === 'string' ||
      Array.isArray((value as { message: unknown }).message);

    return isObject && isNonNullValue && hasMessageProperty && hasValidMessageType;
  }
}
