import { Injectable } from '@nestjs/common';
import { DbAccessService } from "@tvflix/db-layer";
import { Observable } from "rxjs";

@Injectable()
export class MoviesService {
  constructor(private db: DbAccessService) {
  }

  getById(id: string): Observable<any> {
    return this.db.getMovies(id);
  }

  getList(listQuery): Observable<any> {
    return this.db.getList(listQuery);
  }
}
