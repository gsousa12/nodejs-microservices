import { Module } from '@nestjs/common';
import { identityController } from './http/identity.controller';

@Module({
  imports: [],
  controllers: [identityController],
  providers: [],
})
export class identityModule {}
