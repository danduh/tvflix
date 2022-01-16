import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { catchError, map, of } from "rxjs";

@Injectable()
export class DbAccessService {
  private baseUrl = 'http://api.themoviedb.org/3/'
  private apiKey = '11071471d1e815ac9ff80839ffcf619d'

  constructor(private httpService: HttpService) {
  }

  getMovies(id, filter?) {
    const option = {
      params: { 'api_key': this.apiKey },
    }
    return this.httpService.get(`${this.baseUrl}movie/${id}`, option)
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          console.error(err);
          return of(err)
        })
      )
  }

  getList(listQuery) {
    const listType = listQuery?.listType;
    const option = {
      params: { 'api_key': this.apiKey, ...listQuery },
    }
    return this.httpService.get(`${this.baseUrl}movie/${listType}`, option)
      .pipe(
        map((resp) => {
          return resp.data
        }),
        catchError((err) => {
          // console.error(err);
          return of(err)
        })
      )
  }

}
