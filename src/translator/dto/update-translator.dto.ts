import { PartialType } from '@nestjs/mapped-types';
import { CreateTranslatorDto } from './create-translator.dto';

export class UpdateTranslatorDto extends PartialType(CreateTranslatorDto) {}
