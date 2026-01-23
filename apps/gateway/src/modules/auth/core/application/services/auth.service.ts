import { SignInReqDTO, SignInResDTO } from '../../../presentation/dtos';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { delay } from '@orangepay/utils';

@Injectable()
export class AuthService {
  constructor() {}

  async signIn(request: SignInReqDTO): Promise<SignInResDTO> {
    console.log(request);

    await delay(1000);

    const user = true;

    if (!user) {
      throw new HttpException('Credênciais inválidas', HttpStatus.BAD_REQUEST);
    }

    const matchPassword = true;

    if (!matchPassword) {
      throw new HttpException('Credênciais inválidas', HttpStatus.BAD_REQUEST);
    }

    const jwtToken = 'token';

    const data = {
      token: jwtToken,
    };

    return data;
  }
}
