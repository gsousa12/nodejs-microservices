import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse } from '@orangepay/types';
import { Response } from 'express';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.extractMessage(exception);

    const errorResponse: ApiResponse = {
      success: false,
      message: message,
      // error: process.env.NODE_ENV === 'development' ? exception : undefined
    };

    response.status(status).json(errorResponse);
  }

  /**
   *
   * @param exception
   * @returns
   */
  private extractMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'string') {
        return response;
      }

      if (
        typeof response === 'object' &&
        response !== null &&
        'message' in response
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const msg = (response as any).message;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Array.isArray(msg) ? msg.join(', ') : msg;
      }
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'Erro interno do servidor';
  }
}
