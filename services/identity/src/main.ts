import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);

  application.setGlobalPrefix('v1/identity');

  await application.listen(process.env.PORT ?? 3001);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
