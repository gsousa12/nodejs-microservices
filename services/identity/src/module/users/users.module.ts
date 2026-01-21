import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controller/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
