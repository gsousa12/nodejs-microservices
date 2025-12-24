export function getServiceErrorResponse(serviceResponse: any): {
  success: boolean;
  message: string;
} {
  return {
    success: !!serviceResponse.success,
    message: serviceResponse.message,
  };
}
