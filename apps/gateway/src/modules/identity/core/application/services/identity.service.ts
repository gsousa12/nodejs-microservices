import { CreateUserResDTO } from 'src/modules/identity/presentation/dtos/res/create-user.res.dto';
import { CreateUserReqDTO } from 'src/modules/identity/presentation/dtos';
import { identityClient } from 'src/_common/integration/clients';
import { delay, getServiceErrorInfo } from 'src/_common/utils';
import { HttpException, Injectable } from '@nestjs/common';
import { IDENTITY_PATHS } from '@orangepay/consts';
import { ApiResponse } from '@orangepay/types';
import { LogsService } from 'src/_common/modules/logs/core/application/service/logs.service';

@Injectable()
export class IdentityService {
  constructor(private readonly logsService: LogsService) {}

  async create(request: CreateUserReqDTO): Promise<void> {
    await delay(200);
    const path = IDENTITY_PATHS.USERS.CREATE;

    const serviceResponse = await identityClient.post<
      ApiResponse<CreateUserResDTO>
    >(path, request);

    if (!serviceResponse.data.success) {
      const { serviceResponseMessage, serviceResponseStatusCode } =
        getServiceErrorInfo(serviceResponse.data);

      await this.logsService.saveError(serviceResponse);

      throw new HttpException(
        serviceResponseMessage,
        serviceResponseStatusCode,
      );
    }
  }
}
