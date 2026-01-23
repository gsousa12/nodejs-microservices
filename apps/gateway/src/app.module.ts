import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './_common/interceptors';
import { IdentityModule } from './modules/identity/identity.module';
import { CommonModule } from './_common/modules/common.module';

@Module({
  imports: [CommonModule, AuthModule, IdentityModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
