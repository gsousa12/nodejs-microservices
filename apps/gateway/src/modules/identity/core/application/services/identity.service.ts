import { CreateUserResDTO } from 'src/modules/identity/presentation/dtos/res/create-user.res.dto';
import { LogsService } from 'src/_common/modules/logs/core/application/service/logs.service';
import { identityClient } from 'src/_common/integration/clients';
import { HttpException, Injectable } from '@nestjs/common';
import { getServiceErrorInfo } from 'src/_common/utils';
import { IDENTITY_PATHS } from '@orangepay/consts';
import { ApiResponse } from '@orangepay/types';
import { delay } from '@orangepay/utils';
import { CreateUserReqDTO } from 'src/modules/identity/presentation/dtos';

@Injectable()
export class IdentityService {
  constructor(private readonly logsService: LogsService) {}

  async create(request: CreateUserReqDTO): Promise<void> {
    await delay(200);
    const path = IDENTITY_PATHS.USERS.CREATE;

    const serviceResponse = await identityClient.post<ApiResponse<CreateUserResDTO>>(path, request);

    if (!serviceResponse.data.success) {
      const { message, statusCode } = getServiceErrorInfo(serviceResponse.data);

      await this.logsService.saveError(serviceResponse);

      throw new HttpException(message, statusCode);
    }
  }
}
