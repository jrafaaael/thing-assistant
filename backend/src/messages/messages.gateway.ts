import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
import 'dotenv/config';

import { MessagesService } from './messages.service';
import { NewMessageDto } from './dto/new-message.dto';

const WEB_URL = process.env.WEB_URL ?? '';

@WebSocketGateway(8000, { cors: { origin: WEB_URL } })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private messagesService: MessagesService,
    private eventEmitter: EventEmitter2,
  ) {}

  @SubscribeMessage('message.new')
  async handleNewMessage(@MessageBody() { content, roomId }: NewMessageDto) {
    const message = await this.messagesService.storeMessage({
      content,
      roomId: +roomId,
    });

    this.eventEmitter.emit('ai.generate', {
      content,
      roomId: +roomId,
    });

    return message;
  }
}
