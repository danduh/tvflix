export enum ListTypeDto {
  Upcoming = 'upcoming',
  TopRated = 'top_rated',
  Popular = 'popular',
  NowPlaying = 'now_playing',
  Latest = 'latest'
}

export class MoviesListQuery {
  listType: ListTypeDto
  page: number
}
