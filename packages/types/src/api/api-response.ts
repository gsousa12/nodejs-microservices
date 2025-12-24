export type ApiResponseType<TData = unknown> = {
  success: boolean;
  message: string;
  data?: TData;
};
