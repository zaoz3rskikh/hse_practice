import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFormatterInterceptor } from 'src/proxy/responseFormatterInterceptor';
import * as process from 'process';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // api prefix
  app.setGlobalPrefix(`/api/v${process.env.APP_API_VERSION}`);

  // cors
  app.enableCors({
    origin: process.env.APP_FRONTEND_URL,
  });

  // swagger ui
  const config = new DocumentBuilder()
    .setTitle('hse_practice')
    .setDescription('hse_practice')
    .setVersion('v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalInterceptors(new ResponseFormatterInterceptor());

  await app.listen(3000);
}

bootstrap();
