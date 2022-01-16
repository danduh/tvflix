import { Module } from '@nestjs/common';

import { MoviesController } from './moviesController';
import { MoviesService } from './movies.service';
import { DbLayerModule } from "@tvflix/db-layer";

@Module({
  imports: [
    DbLayerModule
  ],
  controllers: [
    MoviesController
  ],
  providers: [
    MoviesService
  ],
})
export class AppModule {
}
