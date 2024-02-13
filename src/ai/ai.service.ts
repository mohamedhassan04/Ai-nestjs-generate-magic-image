import { Injectable } from '@nestjs/common';
import Replicate from 'replicate';
import { AiDto } from './dto/ai.dto';

@Injectable()
export class AiService {
  private replicate: Replicate;
  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_TOKEN_AI,
    });
  }

  async generateImageWithAi(aiDto: AiDto) {
    const output = await this.replicate.run(
      'tencentarc/photomaker-style:467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769',
      {
        input: {
          prompt: aiDto.prompt,
          num_steps: 50,
          style_name: 'Cinematic',
          input_image: aiDto.base64_img,
          num_outputs: 1,
          guidance_scale: 5,
          negative_prompt:
            'realistic, photo-realistic, worst quality, greyscale, bad anatomy, bad hands, error, text',
          style_strength_ratio: 35,
        },
      },
    );
    return output;
  }
}
