import { HttpException, Injectable } from '@nestjs/common';
import { identityClient } from 'src/_common/integration/clients';
import { AxiosResponse } from 'axios';
import { delay } from 'src/_common/utils';
import { CreateUserReqDTO } from 'src/modules/identity/presentation/dtos';
import { AxiosError } from 'axios';
import { IDENTITY_PATHS } from '../../domain/const';

@Injectable()
export class IdentityService {
  constructor() {}

  async create(request: CreateUserReqDTO): Promise<void> {
    console.log(request);
    try {
      await delay(100);
      const response: AxiosResponse = await identityClient.post(
        IDENTITY_PATHS.USERS.CREATE,
        request,
      );
      console.log(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.error((error as any).response?.data.message);
        throw new HttpException(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `${(error as any).response?.data.message}`,
          500,
        );
      }
      throw new HttpException('Ocorreu um error inesperado', 500);
    }
  }
}
