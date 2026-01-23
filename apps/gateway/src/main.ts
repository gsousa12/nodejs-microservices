import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionsFilter } from './_common/filters';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);

  application.useGlobalFilters(new CustomExceptionsFilter());
  application.setGlobalPrefix('gateway');

  await application.listen(process.env.PORT ?? 3000);
}

void bootstrap();
