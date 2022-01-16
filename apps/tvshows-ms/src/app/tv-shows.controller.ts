import { Controller, Get, Param, Query, Scope } from '@nestjs/common';
import { TvShowsService } from "./tv-shows.service";
import { ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { TVShowsListQuery } from "../dtos/list-type.dto";
import { TVShowDetailsDto, TVShowDto } from "../dtos/tv-show.dto";
import { Observable } from "rxjs";
import { ListResponseDto } from "../dtos/response.dto";

@Controller({ path: 'tv', scope: Scope.REQUEST })
export class TvShowsController {
  constructor(private readonly tvShowsService: TvShowsService) {
  }

  @ApiResponse({ status: 201, type: [ListResponseDto], description: 'Get List of Tv Shows by ListType' })
  @ApiQuery({ name: 'listQuery', type: TVShowsListQuery })
  @Get('')
  getTvsList(@Query() listQuery): Observable<[ListResponseDto]> {
    return this.tvShowsService.getTvShowsList(listQuery);
  }


  @ApiResponse({ status: 200, type: TVShowDetailsDto, description: 'Get TV Show Details by ID' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getTvShow(@Param('id') id): Observable<TVShowDetailsDto> {
    return this.tvShowsService.getTvShow(id);
  }

  @ApiResponse({ status: 200, type: TVShowDetailsDto, description: 'Get TV Show Details by ID' })
  @ApiParam({ name: 'season_number' })
  @ApiParam({ name: 'id' })
  @Get(':id/season/:season_number')
  getTvShowSeason(@Param('id') id,
                  @Param('season_number') season_number): Observable<TVShowDetailsDto> {
    return this.tvShowsService.getTvShowSeason(id, season_number);
  }

  @ApiResponse({ status: 200, type: TVShowDetailsDto, description: 'Get TV Show Details by ID' })
  @ApiParam({ name: 'season_number' })
  @ApiParam({ name: 'id' })
  @Get(':id/season/:season_number/images')
  getTvShowSeasonImages(@Param('id') id,
                  @Param('season_number') season_number): Observable<TVShowDetailsDto> {
    return this.tvShowsService.getTvShowSeasonImages(id, season_number);
  }

}
