import { Test, TestingModule } from '@nestjs/testing';

import { TvShowsController } from './TVShowsController';
import { TvShowsService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TvShowsController],
      providers: [TvShowsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to tvshows-ms!"', () => {
      const appController = app.get<TvShowsController>(TvShowsController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to tvshows-ms!',
      });
    });
  });
});
