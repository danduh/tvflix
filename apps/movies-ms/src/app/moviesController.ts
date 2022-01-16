import { Controller, Get, Param, Query, Scope } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Observable } from "rxjs";
import { MovieDetailsDto } from "../dtos/movie.dto";
import { ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { MoviesListQuery } from "../dtos/list-type.dto";
import { ListResponseDto } from "../dtos/response.dto";

@Controller({ path: 'movies', scope: Scope.REQUEST })
export class MoviesController {
  constructor(private readonly appService: MoviesService) {
  }

  @ApiResponse({ status: 201, type: [ListResponseDto], description: 'Get List of Movies Details by ListType' })
  @ApiQuery({ name: 'listQuery', type: MoviesListQuery })
  @Get('')
  getMoviesList(@Query() listQuery): Observable<[ListResponseDto]> {
    return this.appService.getList(listQuery);
  }

  @ApiResponse({ status: 200, type: MovieDetailsDto, description: 'Get Movie Details by {id}' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getMovie(@Param('id') id): Observable<MovieDetailsDto> {
    return this.appService.getById(id);
  }
}
