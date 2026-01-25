import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('/create')
  async create(@Body() request: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    //throw new HttpException('Error de integração', 500);
    const user = false;

    if (!user) {
      return {
        success: false,
        message: 'usuario nao encontrado',
        meta: {
          requestId: '1234567890',
          time: new Date(),
          statusCodeError: HttpStatus.NOT_FOUND,
        },
      };
    }

    const response = {
      success: true,
      message: 'Usuário criado com sucesso',
      data: {
        id: 'user_1234567890',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        name: request.name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        email: request.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      meta: {
        requestId: '1234567890',
        time: new Date(),
      },
    };

    return response;
  }
}
