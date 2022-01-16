import { Module } from '@nestjs/common';
import { TvShowsController } from "./tv-shows.controller";
import { TvShowsService } from "./tv-shows.service";
import { DbLayerModule } from "@tvflix/db-layer";


@Module({
  imports: [DbLayerModule],
  controllers: [TvShowsController],
  providers: [TvShowsService],
})
export class AppModule {}
