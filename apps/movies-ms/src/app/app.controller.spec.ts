import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { MoviesService } from './movies.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [MoviesService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to movies-ms!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to movies-ms!',
      });
    });
  });
});
