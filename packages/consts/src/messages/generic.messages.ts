type GenericMessages = {
  INTERNAL_SERVER_ERROR: string;
  UNAUTHORIZED: string;
  BAD_REQUEST: string;
  SUCCESS_OPERATION: string;
  VALIDATION_ERROR: string
};

export const GENERIC_MESSAGES = {
  INTERNAL_SERVER_ERROR:
    "Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.",
  UNAUTHORIZED: "Você não tem permissão para acessar este recurso.",
  BAD_REQUEST: "A solicitação foi inválida ou não pode ser atendida.",
  SUCCESS_OPERATION: "Operação realizada com sucesso.",
  VALIDATION_ERROR: "Ocorreu um erro de validação."
} as const satisfies GenericMessages;
