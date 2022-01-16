import { Controller, Get, Param } from '@nestjs/common';

import { MoviesService } from './movies.service';
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { MovieDto } from "../dtos/movie.dto";


@Controller('movies')
export class AppController {
  constructor(private readonly appService: MoviesService) {
  }

  @Get(':id')
  @ApiResponse({ status: 201, type: MovieDto, description: 'Get Movie Details' })
  @ApiParam({ name: 'id' })
  getMovie(@Param('id') id): Observable<MovieDto> {
    return this.appService.getById(id);
  }
}
