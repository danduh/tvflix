import { Test } from '@nestjs/testing';

import { TvShowsService } from './app.service';

describe('AppService', () => {
  let service: TvShowsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TvShowsService],
    }).compile();

    service = app.get<TvShowsService>(TvShowsService);
  });

  describe('getData', () => {
    it('should return "Welcome to tvshows-ms!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to tvshows-ms!' });
    });
  });
});
