import { TVShowDto } from "./tv-show.dto";

export class ListResponseDto {
  page?: number
  results: Array<TVShowDto>
  total_pages: number
  total_results: number
}
