import { PartialType } from '@nestjs/mapped-types';
import { CreateContentGenerationDto } from './create-content-generation.dto';

export class UpdateContentGenerationDto extends PartialType(CreateContentGenerationDto) {}
