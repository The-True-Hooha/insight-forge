import { Module } from '@nestjs/common';
import { ContentGenerationService } from './content-generation.service';
import { ContentGenerationController } from './content-generation.controller';

@Module({
  controllers: [ContentGenerationController],
  providers: [ContentGenerationService],
})
export class ContentGenerationModule {}
