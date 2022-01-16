import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MoviesService } from './movies.service';
import { DbLayerModule } from "@tvflix/db-layer";

@Module({
  imports: [
    DbLayerModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    MoviesService
  ],
})
export class AppModule {
}
