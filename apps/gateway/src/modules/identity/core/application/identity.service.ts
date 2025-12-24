import { Injectable } from '@nestjs/common';
import {
  SingInRequestDto,
  SingInResponseDto,
} from '../domain/dtos/sign-in.dto';
import { ApiResponseType } from '@orangepay/types';
import { getServiceErrorResponse } from '@orangepay/utils/src/index';
import { httpClient } from 'src/__integration/axios.client';

@Injectable()
export class IdentityService {
  async signIn(dto: SingInRequestDto): Promise<SingInResponseDto> {
    const authServiceUrl =
      process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

    const response = await httpClient.post<ApiResponseType<SingInResponseDto>>(
      `${authServiceUrl}/auth/sign-in`,
      dto,
    );

    const { success, message } = getServiceErrorResponse(response.data);

    if (!success) {
      throw new Error(message);
    }

    return response.data.data as SingInResponseDto;
  }
}
