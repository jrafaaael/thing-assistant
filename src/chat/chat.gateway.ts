import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { AskDto } from './dto/ask.dto';

@WebSocketGateway(8000)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatService,
  ) {}

  @SubscribeMessage('message.new')
  async handleNewMessage(@MessageBody() data: AskDto) {
    const message = await this.chatService.storeMessage({
      content: data.content,
      roomId: data.roomId,
    });

    this.server.emit('message.received', message);
  }
}
