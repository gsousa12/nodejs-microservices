import { IdentityService } from '../core/application/services/identity.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseMessage } from 'src/_common/decorators';
import { CreateUserReqDTO } from './dtos';

@Controller('identity')
export class identityController {
  constructor(private readonly _identityService: IdentityService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Usuário criado com sucesso')
  async create(@Body() request: CreateUserReqDTO): Promise<void> {
    await this._identityService.create(request);
  }
}
