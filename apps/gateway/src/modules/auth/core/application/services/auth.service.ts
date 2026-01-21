import { HttpException, Injectable } from '@nestjs/common';
import { SignInReqDTO, SignInResDTO } from '../../../presentation/dtos';
import { delay } from 'src/_common/utils';

@Injectable()
export class AuthService {
  constructor() {}

  async signIn(request: SignInReqDTO): Promise<SignInResDTO> {
    console.log(request);

    await delay(1000);

    const user = true;

    if (!user) {
      throw new HttpException('Credênciais inválidas', 404);
    }

    const mathPassword = true;

    if (!mathPassword) {
      throw new HttpException('Credênciais inválidas', 400);
    }

    const jwtToken = 'token';

    const data = {
      token: jwtToken,
    };

    return data;
  }
}
