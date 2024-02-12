import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';

@Module({
  controllers: [TranslatorController],
  providers: [TranslatorService],
})
export class TranslatorModule {}
