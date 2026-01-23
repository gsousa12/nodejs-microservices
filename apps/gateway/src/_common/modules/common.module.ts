import { Global, Module } from '@nestjs/common';
import { LogsService } from './logs/core/application/service/logs.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [LogsService],
  exports: [LogsService],
})
export class CommonModule {}
