import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor (private jwtService: JwtService) {}

  async canActivate (context: ExecutionContext) {
    const data = context.switchToWs().getClient()
    return this.jwtService
      .verifyAsync(data.handshake.query.auth)
      .then(() => {
        return true
      })
      .catch(() => {
        throw new WsException(
          'provide a valid auth token in "auth" query param'
        )
      })
  }
}
