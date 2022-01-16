import { Injectable } from '@nestjs/common';
import { DbAccessService } from "@tvflix/db-layer";

@Injectable()
export class TvShowsService {
  constructor(private db: DbAccessService) {
  }

  getTvShowsList(listQuery) {
    return this.db.getTvsList(listQuery)
  }

  getTvShow(id) {
    return this.db.getTvsShow(id)
  }

  getTvShowSeason(id, season_number) {
    return this.db.getTvShowSeason(id, season_number)
  }

  getTvShowSeasonImages(id, season_number) {
    return this.db.getTvShowSeasonImages(id, season_number)
  }
}
