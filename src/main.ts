import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { AppModule } from './app.module';
import { PrismaExceptionInterceptor } from './interceptors/prisma-exception-interceptor.interceptor';
import { LoggingService } from './logging/logging.service';
import { AllExceptionFilter } from './exceptions-filters/AllExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggingService);
  app.useLogger(loggingService);
  app.useGlobalFilters(new AllExceptionFilter(loggingService));

  const port = configService.get('PORT', 4000);

  const yamlDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('docs', app, yamlDocument);

  app.useGlobalInterceptors(new PrismaExceptionInterceptor());

  await app.listen(port);

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception', error.message);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', reason.toString());
  });
}
bootstrap();
