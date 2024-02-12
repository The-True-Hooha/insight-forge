import { Test, TestingModule } from '@nestjs/testing';
import { TranslatorController } from './translator.controller';
import { TranslatorService } from './translator.service';

describe('TranslatorController', () => {
  let controller: TranslatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslatorController],
      providers: [TranslatorService],
    }).compile();

    controller = module.get<TranslatorController>(TranslatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
