export class TVShowDto {
  backdrop_path: string;
  first_air_date: Date;
  genre_ids: Array<number>;
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export class TVShowDetailsDto extends TVShowDto {
  adult: boolean;
  created_by: any[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: LastEpisodeToAir;
  next_episode_to_air?: number;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: any[];
  production_countries: any[];
  seasons: Array<Season>;
  spoken_languages: Array<SpokenLanguage>;
  status: string;
  tagline: string;
  type: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path?: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

