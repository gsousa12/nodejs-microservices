import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@orangepay/types';

interface ServiceErrorInfo {
  message: string;
  statusCode: number;
}

export function getServiceErrorInfo(
  serviceResponse: ApiResponse,
  defaultMessage = 'Ocorreu um erro inesperado.',
  defaultStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
): ServiceErrorInfo {
  return {
    message: serviceResponse?.message || defaultMessage,
    statusCode: serviceResponse?.meta?.statusCodeError ?? defaultStatusCode,
  };
}
