import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatbotsService } from './chatbots.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';

@Controller('chatbots')
export class ChatbotsController {
  constructor(private readonly chatbotsService: ChatbotsService) {}

  @Post()
  create(@Body() createChatbotDto: CreateChatbotDto) {
    return this.chatbotsService.create(createChatbotDto);
  }

  @Get()
  findAll() {
    return this.chatbotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatbotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatbotDto: UpdateChatbotDto) {
    return this.chatbotsService.update(+id, updateChatbotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatbotsService.remove(+id);
  }
}
