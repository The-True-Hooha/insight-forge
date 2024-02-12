import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentGenerationService } from './content-generation.service';
import { CreateContentGenerationDto } from './dto/create-content-generation.dto';
import { UpdateContentGenerationDto } from './dto/update-content-generation.dto';

@Controller('content-generation')
export class ContentGenerationController {
  constructor(private readonly contentGenerationService: ContentGenerationService) {}

  @Post()
  create(@Body() createContentGenerationDto: CreateContentGenerationDto) {
    return this.contentGenerationService.create(createContentGenerationDto);
  }

  @Get()
  findAll() {
    return this.contentGenerationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentGenerationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentGenerationDto: UpdateContentGenerationDto) {
    return this.contentGenerationService.update(+id, updateContentGenerationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentGenerationService.remove(+id);
  }
}
