import { HttpException } from '@nestjs/common';
import { ApiResponse } from '@orangepay/types';
import { AxiosError } from 'axios';

export function handleServiceError(
  error: unknown,
  defaultMessage = 'Ocorreu um erro inesperado',
): never {
  if (error instanceof AxiosError) {
    throw new HttpException(
      `${(error as AxiosError<ApiResponse>).response?.data.message}`,
      500,
    );
  }
  throw new HttpException(defaultMessage, 500);
}
