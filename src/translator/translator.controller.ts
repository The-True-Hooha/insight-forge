import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { CreateTranslatorDto } from './dto/create-translator.dto';
import { UpdateTranslatorDto } from './dto/update-translator.dto';

@Controller('t')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Post()
  create(@Body() createTranslatorDto: CreateTranslatorDto) {
    return this.translatorService.create(createTranslatorDto);
  }

  @Get('/k')
  findAll() {
    return this.translatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslatorDto: UpdateTranslatorDto) {
    return this.translatorService.update(+id, updateTranslatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translatorService.remove(+id);
  }
}
