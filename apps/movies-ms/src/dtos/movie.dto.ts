export class MovieDto {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export class MovieDetailsDto extends MovieDto {
  belongs_to_collection?: number;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}


export class Genre {
  id: number;
  name: string;
}

export class ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export class ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export class SpokenLanguage {
  iso_639_1: string;
  name: string;
}
