import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('/')
  async create(@Body() request: any) {
    console.log('createUserDto', request);
    await new Promise((resolve) => setTimeout(resolve, 100));
    // throw new HttpException('Error de integração', 500);
    return {
      success: true,
      message: 'User created successfully',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: request,
    };
  }
}
