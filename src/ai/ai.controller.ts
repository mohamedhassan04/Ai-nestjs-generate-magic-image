import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiDto } from './dto/ai.dto';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/generateImageWithAi')
  async generateImageWithAi(@Body() aiDto: AiDto) {
    return await this.aiService.generateImageWithAi(aiDto);
  }
}
