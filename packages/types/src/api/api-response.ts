type MetaInfo = {
  idempotencyKey?: string;
  requestId?: string;
  time: Date;
  statusCodeError?: number;
  otherInfo?: Record<string, any>;
};

type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  meta?: MetaInfo;
} & (T extends void ? {} : { data: T });

type ApiErrorResponse = {
  success: false;
  message: string;
  meta?: MetaInfo;
};

export type ApiResponse<T = void> = ApiSuccessResponse<T> | ApiErrorResponse;
