export enum ListTypeDto {
  AiringToday = 'airing_today',
  TopRated = 'top_rated',
  Popular = 'popular',
  OnTheAir = 'on_the_air',
  Latest = 'latest'
}

export class TVShowsListQuery {
  listType: ListTypeDto
  page: number
}
