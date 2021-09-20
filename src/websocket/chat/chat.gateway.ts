import { UseGuards } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'

import { WebSocketAuthGuard } from './guards/websocketAuth.guard'
import { ChatMessage } from './interfaces/chatMessage.interface'

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  socket: any;

  @UseGuards(WebSocketAuthGuard)
  @SubscribeMessage('chat')
  handleChatMessage (@MessageBody() data: ChatMessage) {
    this.socket.emit('chat', data)
  }
}
