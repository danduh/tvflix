import { Test } from '@nestjs/testing';

import { MoviesService } from './movies.service';

describe('AppService', () => {
  let service: MoviesService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = app.get<MoviesService>(MoviesService);
  });

  describe('getData', () => {
    it('should return "Welcome to movies-ms!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to movies-ms!' });
    });
  });
});
