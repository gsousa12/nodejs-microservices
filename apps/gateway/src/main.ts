import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionsFilter } from './_common/filters';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);

  application.useGlobalFilters(new CustomExceptionsFilter());

  application.setGlobalPrefix('v1/gateway');

  await application.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
