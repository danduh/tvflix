import { Test, TestingModule } from '@nestjs/testing';

import { MoviesController } from './moviesController';
import { MoviesService } from './movies.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to movies-ms!"', () => {
      const appController = app.get<MoviesController>(MoviesController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to movies-ms!',
      });
    });
  });
});
