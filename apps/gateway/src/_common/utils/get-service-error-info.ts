import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@orangepay/types';

export function getServiceErrorInfo(
  apiResponse: ApiResponse,
  defaultMessage = 'Ocorreu um erro inesperado.',
  defaultStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
) {
  const serviceResponseMessage: string = apiResponse?.message || defaultMessage;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const serviceResponseStatusCode: number =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    apiResponse?.meta?.statusCodeError ?? defaultStatusCode;

  return { serviceResponseMessage, serviceResponseStatusCode };
}
