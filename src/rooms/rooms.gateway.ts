import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
import { RoomsService } from './rooms.service';
import { AskDto } from './dto/ask.dto';

@WebSocketGateway(8000)
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private roomsService: RoomsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @SubscribeMessage('message.new')
  async handleNewMessage(@MessageBody() data: AskDto) {
    const message = await this.roomsService.storeMessage({
      content: data.content,
      roomId: +data.roomId,
    });

    this.eventEmitter.emit('ai.generate', {
      content: data.content,
      roomId: +data.roomId,
    });

    return message;
  }
}
