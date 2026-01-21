type ApiSuccess<T> = {
  success: true;
  message: string;
} & (T extends void ? {} : { data: T });

type ApiError = {
  success: false;
  message: string;
};

// study note : Discriminated Unions
export type ApiResponse<T = void> = ApiSuccess<T> | ApiError;
