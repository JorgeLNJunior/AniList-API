import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ChatGateway } from './chat.gateway';
import { WebSocketAuthGuard } from './guards/websocketAuth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('AUTH_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [ChatGateway, WebSocketAuthGuard],
})
export class ChatModule {}
