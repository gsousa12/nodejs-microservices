import { createZodDto } from 'nestjs-zod';
import { createUserReqSchema } from '@orangepay/schemas';

export class CreateUserReqDTO extends createZodDto(createUserReqSchema) {}
