import { Constants } from '@config/constants';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ChatGateway } from './chat.gateway';
import { WebSocketAuthGuard } from './guards/websocket.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => Constants.jwtOptions(),
    }),
  ],
  providers: [ChatGateway, WebSocketAuthGuard],
})
export class ChatModule {}
