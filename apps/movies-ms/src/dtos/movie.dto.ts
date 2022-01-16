export class MovieDto {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection?: number;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path?:           string;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
}

export class Genre {
  id:   number;
  name: string;
}

export class ProductionCompany {
  id:             number;
  logo_path:      null | string;
  name:           string;
  origin_country: string;
}

export class ProductionCountry {
  iso_3166_1: string;
  name:       string;
}

export class SpokenLanguage {
  iso_639_1: string;
  name:      string;
}
