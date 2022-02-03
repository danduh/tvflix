import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  await app.listen(port, '0.0.0.0', () => {
    Logger.log('api-gateway at http://localhost:' + port + '/graphql');
  });
}

bootstrap();
