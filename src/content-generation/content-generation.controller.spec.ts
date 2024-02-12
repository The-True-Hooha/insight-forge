import { Test, TestingModule } from '@nestjs/testing';
import { ContentGenerationController } from './content-generation.controller';
import { ContentGenerationService } from './content-generation.service';

describe('ContentGenerationController', () => {
  let controller: ContentGenerationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentGenerationController],
      providers: [ContentGenerationService],
    }).compile();

    controller = module.get<ContentGenerationController>(ContentGenerationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
