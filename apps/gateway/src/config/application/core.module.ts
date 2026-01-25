import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './logger.config';
import { globalProviders } from './providers';

@Global()
@Module({
  imports: [LoggerModule.forRoot(loggerConfig)],
  providers: [...globalProviders],
  exports: [LoggerModule],
})
export class CoreModule {}
