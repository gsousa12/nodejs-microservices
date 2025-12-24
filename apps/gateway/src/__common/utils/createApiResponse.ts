import { ApiResponseType } from '@orangepay/types';

export function createApiResponse<T>(
  success: boolean,
  message: string,
  data?: any,
): ApiResponseType<T> {
  return {
    success,
    message,
    ...(success && { data }),
  };
}
