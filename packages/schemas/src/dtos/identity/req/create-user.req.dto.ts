import { z } from 'zod';

export const createUserReqSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha deve ter 6 caracteres"),
});
