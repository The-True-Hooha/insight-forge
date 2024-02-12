import { Injectable } from '@nestjs/common';
import { CreateTranslatorDto } from './dto/create-translator.dto';
import { UpdateTranslatorDto } from './dto/update-translator.dto';

@Injectable()
export class TranslatorService {
  create(createTranslatorDto: CreateTranslatorDto) {
    return 'This action adds a new translator';
  }

  findAll() {
    return `This action returns all translator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translator`;
  }

  update(id: number, updateTranslatorDto: UpdateTranslatorDto) {
    return `This action updates a #${id} translator`;
  }

  remove(id: number) {
    return `This action removes a #${id} translator`;
  }
}
