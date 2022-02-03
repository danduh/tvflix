import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { catchError, map, of, tap } from "rxjs";

function camelCase(obj) {
  const newObj = {};
  for (const d in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(d)) {
      newObj[d.replace(/(_\w)/g, function (k) {
        return k[1].toUpperCase();
      })] = obj[d];
    }
  }
  return newObj;
}

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
          return of(err)
        })
      )
  }

  getMoviesList(listQuery) {
    const listType = listQuery?.listType;
    const option = {
      params: { 'api_key': this.apiKey, ...listQuery },
    }
    return this.httpService.get(`${this.baseUrl}movie/${listType}`, option)
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          return of(err)
        })
      )
  }

  getTvsList(listQuery) {
    const listType = listQuery?.listType;
    const option = {
      params: { 'api_key': this.apiKey, ...listQuery },
    }
    return this.httpService.get(`${this.baseUrl}tv/${listType}`, option)
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          console.log(err)
          return of(err)
        })
      )
  }


  getTvsShow(id) {
    const option = {
      params: { 'api_key': this.apiKey },
    }
    return this.httpService.get(`${this.baseUrl}tv/${id}`, option)
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          return of(err)
        })
      )
  }

  getTvShowSeason(id, season_number) {
    const option = {
      params: { 'api_key': this.apiKey },
    }
    return this.httpService.get(`${this.baseUrl}tv/${id}/season/${season_number}`, option)
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          return of(err)
        })
      )
  }

  getTvShowSeasonImages(id, season_number) {
    const option = {
      params: { 'api_key': this.apiKey },
    }
    return this.httpService.get(`${this.baseUrl}tv/${id}/season/${season_number}/images`, option)
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          return of(err)
        })
      )
  }

  getCast(id) {
    const option = {
      params: { 'api_key': this.apiKey },
    }
    return this.httpService.get(`${this.baseUrl}person/${id}`, option)
      .pipe(
        map((resp) => resp.data),
        map(camelCase),
        catchError((err) => {
          return of(err)
        })
      )
  }

  getCastImages(id) {
    const option = {
      params: { 'api_key': this.apiKey },
    }
    return this.httpService.get(`${this.baseUrl}person/${id}/images`, option)
      .pipe(
        map((resp) => {
          return {
            ...resp.data,
            profiles: resp.data.profiles.map(camelCase)
          }
        }),
        map(camelCase),
        tap(console.log),
        catchError((err) => {
          return of(err)
        })
      )
  }
}
