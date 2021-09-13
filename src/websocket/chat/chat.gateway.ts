import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { WebSocketAuthGuard } from './guards/websocketAuth.guard';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  private socket: any;

  @UseGuards(WebSocketAuthGuard)
  @SubscribeMessage('chat')
  handleChatMessage(@MessageBody() data: ChatMessage) {
    this.socket.emit('chat', data);
  }
}

interface ChatMessage {
  avatar: string;
  username: string;
  message: string;
}
