import { Module } from '@nestjs/common';
import { identityModule } from './modules/identity/identity.module';

@Module({
  imports: [identityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
