/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GENERIC_MESSAGES } from '@orangepay/consts';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';

@Catch(ZodValidationException, HttpException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse: any = exception.getResponse();
    const isZodError = exception instanceof ZodValidationException;
    const isHttpException = exception instanceof HttpException;

    let genericErrorMessage: null | string = null;

    if (isHttpException && typeof exceptionResponse === 'string') {
      genericErrorMessage = exceptionResponse;
    }

    if (isZodError) {
      const hasErrorMessage = exceptionResponse?.errors && exceptionResponse.errors.length > 0;

      if (!hasErrorMessage) {
        genericErrorMessage = GENERIC_MESSAGES.VALIDATION_ERROR as string;
        return;
      }

      const issues = exceptionResponse.errors;

      if (issues && issues.length > 0) {
        genericErrorMessage = issues[0].message;
      }
    }

    response.status(status).json({
      success: false,
      message: genericErrorMessage ?? (GENERIC_MESSAGES.INTERNAL_SERVER_ERROR as string),
    });
  }
}
