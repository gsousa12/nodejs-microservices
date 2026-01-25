import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@orangepay/types';
import { Response } from 'express';

interface HttpExceptionResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.extractStatusCode(exception);
    const message = this.extractMessage(exception);

    const errorResponse: ApiResponse = {
      success: false,
      message,
    };

    response.status(status).json(errorResponse);
  }

  private extractStatusCode(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private extractMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      return this.extractHttpExceptionMessage(exception);
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'Erro interno do servidor';
  }

  private extractHttpExceptionMessage(exception: HttpException): string {
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    if (this.isHttpExceptionResponse(response)) {
      const { message } = response;
      return Array.isArray(message) ? message.join(', ') : message;
    }

    return 'Erro interno do servidor';
  }

  private isHttpExceptionResponse(response: unknown): response is HttpExceptionResponse {
    return typeof response === 'object' && response !== null && 'message' in response;
  }
}
