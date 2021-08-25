import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { WebSocketAuthGuard } from './guards/websocket.guard';

@WebSocketGateway()
export class ChatGateway {
  @UseGuards(WebSocketAuthGuard)
  @SubscribeMessage('chat')
  handleChatMessage(
    @MessageBody() data: ChatMessage,
    @ConnectedSocket() client: any,
  ) {
    client.emit('chat', data);
  }
}

interface ChatMessage {
  avatar: string;
  username: string;
  message: string;
}
