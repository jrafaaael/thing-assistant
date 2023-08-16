import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { AskDto } from './dto/ask.dto';

@WebSocketGateway(8000)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatService,
    private eventEmitter: EventEmitter2,
  ) {}

  @SubscribeMessage('message.new')
  async handleNewMessage(@MessageBody() data: AskDto) {
    const message = await this.chatService.storeMessage({
      content: data.content,
      roomId: data.roomId,
    });

    this.eventEmitter.emit('ai.generate', {
      content: data.content,
      roomId: data.roomId,
    });

    this.server.emit('message.received', message);
  }
}
