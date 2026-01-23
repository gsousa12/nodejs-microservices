import { SignInReqDTO, SignInResDTO } from '../dtos';
import { AuthService } from '../../core/application/services/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseMessage } from 'src/_common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Usuário logado com sucesso')
  async signIn(@Body() request: SignInReqDTO): Promise<SignInResDTO> {
    return this._authService.signIn(request);
  }
}
