import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeaders = request.headers['api-key'];
    if (!apiKeyHeaders) {
      return false;
    }
    const foundUser = await this.prisma.user.findFirst({
      where: { apiKey: apiKeyHeaders },
    });
    if (!foundUser || foundUser.apiKey !== apiKeyHeaders) {
      return false;
    }
    return true;
  }
}
