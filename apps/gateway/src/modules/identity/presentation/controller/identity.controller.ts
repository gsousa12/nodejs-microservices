import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseMessage } from 'src/_common/decorators';
import { IdentityService } from '../../core/application/services/identity.service';
import { IDENTITY_PATHS } from '@orangepay/consts';
import { CreateUserReqDTO } from '../dtos';

@Controller('identity')
export class IdentityController {
  constructor(private readonly _identityService: IdentityService) {}

  @Post(IDENTITY_PATHS.USERS.CREATE)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Usuário criado com sucesso')
  async create(@Body() request: CreateUserReqDTO): Promise<any> {
    await this._identityService.create(request);
    const user = {
      id: '123',
      email: request.email,
      name: request.name,
    };

    return user;
  }
}
