import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseMessage } from 'src/_common/decorators';
import { IdentityService } from '../../core/application/services/identity.service';
import { CreateUserReqDTO } from '../dtos';
import { IDENTITY_PATHS } from '@orangepay/consts';

@Controller('identity')
export class IdentityController {
  constructor(private readonly _identityService: IdentityService) {}

  @Post(IDENTITY_PATHS.USERS.CREATE)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Usuário criado com sucesso')
  async create(@Body() request: CreateUserReqDTO): Promise<void> {
    await this._identityService.create(request);
  }
}
