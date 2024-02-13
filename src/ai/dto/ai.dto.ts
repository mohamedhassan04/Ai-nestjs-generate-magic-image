import { IsString } from 'class-validator';

export class AiDto {
  @IsString()
  prompt: string;

  @IsString()
  base64_img: string;
}
