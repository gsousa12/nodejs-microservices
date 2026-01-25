import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { enviromentConfig } from './config/application/enviroment';

async function bootstrap() {
  const application = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  application.useLogger(application.get(Logger));

  application.setGlobalPrefix('gateway');

  await application.listen(enviromentConfig.PORT);
}

void bootstrap();
