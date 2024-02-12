import { Test, TestingModule } from '@nestjs/testing';
import { ContentGenerationService } from './content-generation.service';

describe('ContentGenerationService', () => {
  let service: ContentGenerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentGenerationService],
    }).compile();

    service = module.get<ContentGenerationService>(ContentGenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
