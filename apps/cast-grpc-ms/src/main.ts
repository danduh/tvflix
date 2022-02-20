/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { join } from 'path'
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `localhost:${process.env.PORT || 5000}`,
      package: 'cast',
      protoPath: join(__dirname, 'assets/proto/cast.proto'),
    },
  });

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3333;
  await app.listen();
  Logger.log(
    `🚀 Application is running at http://localhost:${process.env.PORT || 5000}`
  );
}

bootstrap();
