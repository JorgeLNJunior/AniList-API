import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const data = context.switchToWs().getClient();
      await this.jwtService.verifyAsync(data.handshake.query.auth);
      return true;
    } catch (error) {
      return false;
    }
  }
}
