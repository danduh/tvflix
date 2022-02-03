import { Injectable } from '@nestjs/common';
import { DbAccessService } from "@tvflix/db-layer";

@Injectable()
export class AppService {
  constructor(private db: DbAccessService) {
  }

  getPersonData(id: number) {
    return this.db.getCast(id);
  }
  getPersonImages(id: number) {
    return this.db.getCastImages(id);
  }
}
