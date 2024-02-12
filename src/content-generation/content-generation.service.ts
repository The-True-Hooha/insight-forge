import { Injectable } from '@nestjs/common';
import { CreateContentGenerationDto } from './dto/create-content-generation.dto';
import { UpdateContentGenerationDto } from './dto/update-content-generation.dto';

@Injectable()
export class ContentGenerationService {
  create(createContentGenerationDto: CreateContentGenerationDto) {
    return 'This action adds a new contentGeneration';
  }

  findAll() {
    return `This action returns all contentGeneration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentGeneration`;
  }

  update(id: number, updateContentGenerationDto: UpdateContentGenerationDto) {
    return `This action updates a #${id} contentGeneration`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentGeneration`;
  }
}
