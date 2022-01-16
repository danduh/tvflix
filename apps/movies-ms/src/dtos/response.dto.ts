import { MovieDto } from "./movie.dto";

export class ListResponseDto {
  page?: number
  results: Array<MovieDto>
  total_pages: number
  total_results: number
}
