import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { AccessKeyDto } from './dto/accessKey.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('/access-key')
  async accessKey(@Body() accessKeyDto: AccessKeyDto) {
    return await this.authService.getAccessKey(accessKeyDto);
  }
}
