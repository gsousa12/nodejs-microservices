import { Module } from '@nestjs/common';
import { identityController } from './presentation/identity.controller';
import { IdentityService } from './core/application/services/identity.service';

@Module({
  imports: [],
  controllers: [identityController],
  providers: [IdentityService],
})
export class IdentityModule {}
