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

  async generateImageWithAiFilm(aiDto: AiDto) {
    const output = await this.replicate.run(
      'zsxkib/instant-id:6af8583c541261472e92155d87bba80d5ad98461665802f2ba196ac099aaedc9',
      {
        input: {
          image: aiDto.base64_img,
          width: 640,
          height: 640,
          prompt: aiDto.prompt,
          scheduler: 'EulerDiscreteScheduler',
          enable_lcm: false,
          sdxl_weights: 'protovision-xl-high-fidel',
          pose_strength: 0.4,
          canny_strength: 0.3,
          depth_strength: 0.5,
          guidance_scale: 5,
          negative_prompt:
            '(lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured (lowres, low quality, worst quality:1.2), (text:1.2), watermark, painting, drawing, illustration, glitch,deformed, mutated, cross-eyed, ugly, disfigured',
          ip_adapter_scale: 0.8,
          lcm_guidance_scale: 1.5,
          num_inference_steps: 30,
          enable_pose_controlnet: true,
          enhance_nonface_region: true,
          enable_canny_controlnet: false,
          enable_depth_controlnet: false,
          lcm_num_inference_steps: 5,
          controlnet_conditioning_scale: 0.8,
        },
      },
    );
    return output;
  }
}
