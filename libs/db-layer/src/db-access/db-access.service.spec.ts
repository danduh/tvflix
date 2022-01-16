import { Test, TestingModule } from '@nestjs/testing';
import { DbAccessService } from './db-access.service';

describe('DbAccessService', () => {
  let service: DbAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbAccessService],
    }).compile();

    service = module.get<DbAccessService>(DbAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
