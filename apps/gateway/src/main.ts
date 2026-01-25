import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CustomExceptionsFilter } from './_common/filters';
// import { ZodValidationExceptionFilter } from './_common/filters/zod-validation-exception.filter';
import { GlobalExceptionFilter } from './_common/filters/global-exception.filter';

async function bootstrap() {
  const application = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });

  application.setGlobalPrefix('gateway');
  // application.useGlobalFilters(new CustomExceptionsFilter());
  // application.useGlobalFilters(new ZodValidationExceptionFilter());
  application.useGlobalFilters(new GlobalExceptionFilter());

  await application.listen(process.env.PORT ?? 3000);
}

void bootstrap();
