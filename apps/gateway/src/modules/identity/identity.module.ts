import { Module } from '@nestjs/common';
import { IdentityService } from './core/application/services/identity.service';
import { IdentityController } from './presentation/controller/identity.controller';

@Module({
  imports: [],
  controllers: [IdentityController],
  providers: [IdentityService],
})
export class IdentityModule {}
