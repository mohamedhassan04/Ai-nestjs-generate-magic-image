import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AccessKeyDto } from './dto/accessKey.dto';
import { hashString } from 'src/utils/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(signUpDto: SignUpDto) {
    const randomUUID = crypto.randomUUID();
    const randomSalt = await bcrypt.genSalt(10);
    // const hashedApiKey = await bcrypt.hash(randomUUID, randomSalt);
    const hashedPassword = await bcrypt.hash(signUpDto.password, randomSalt);

    return await this.prisma.user.create({
      data: { ...signUpDto, apiKey: randomUUID, password: hashedPassword },
      select: {
        id: false,
        email: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAccessKey(accessKeyDto: AccessKeyDto): Promise<{ apiKey: string }> {
    const foundUser = await this.prisma.user.findFirst({
      where: { email: accessKeyDto.email },
    });

    const isHashValid = await bcrypt.compare(
      accessKeyDto.password,
      foundUser.password,
    );

    if (isHashValid) {
      return { apiKey: foundUser.apiKey };
    } else {
      throw new UnauthorizedException('You do not have access !');
    }
  }
}
