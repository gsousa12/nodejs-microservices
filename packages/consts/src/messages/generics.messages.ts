type GenericErrorMessages = {
  INTERNAL_SERVER_ERROR: string;
  NOT_FOUND: string;
  UNAUTHORIZED: string;
  BAD_REQUEST: string;
};

export const genericErrorMessages : GenericErrorMessages = {
  INTERNAL_SERVER_ERROR:
    "An unexpected error occurred. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED: "You do not have permission to access this resource.",
  BAD_REQUEST: "The request was invalid or cannot be served.",
} as const satisfies GenericErrorMessages;
