export class SingInRequestDto {
  email: string;
  password: string;
}

export class SingInResponseDto {
  access_token: string;
}
