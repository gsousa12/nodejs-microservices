import { Body, Controller, Post } from '@nestjs/common';
import {
  SingInRequestDto,
  SingInResponseDto,
} from '../core/domain/dtos/sign-in.dto';
import { IdentityService } from '../core/application/identity.service';
import { ApiResponseType } from '@orangepay/types';
import { createApiResponse } from 'src/__common/utils/createApiResponse';

@Controller('identity')
export class identityController {
  constructor(private readonly _identityService: IdentityService) {}

  @Post('sign-in')
  async signIn(@Body() dto: SingInRequestDto): Promise<ApiResponseType> {
    try {
      const result = await this._identityService.signIn(dto);

      return createApiResponse<SingInResponseDto>(
        true,
        'Login realizado com sucesso',
        result,
      );
    } catch (error) {
      return createApiResponse(false, 'Erro ao realizar login');
    }
  }
}
