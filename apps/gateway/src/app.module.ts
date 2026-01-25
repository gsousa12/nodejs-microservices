// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { IdentityModule } from './modules/identity/identity.module';
import { CommonModule } from './_common/modules/common.module';
import { CoreModule } from './config/application/core.module';

@Module({
  imports: [CoreModule, CommonModule, AuthModule, IdentityModule],
})
export class AppModule {}
