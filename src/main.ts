import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { AppModule } from './app.module';
import { PrismaExceptionInterceptor } from './interceptors/prisma-exception-interceptor.interceptor';

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
  const port = configService.get('PORT', 4000);

  const yamlDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('docs', app, yamlDocument);

  app.useGlobalInterceptors(new PrismaExceptionInterceptor());

  await app.listen(port);
}
bootstrap();
