import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { VectorStoreService } from 'src/common/vector-store.service';
import { AskDto } from '../dto/ask.dto';
import { RoomGateway } from '../room.gateway';
import { RoomService } from '../room.service';

@Injectable()
export class AiListener {
  constructor(
    private vectorStore: VectorStoreService,
    private roomGateway: RoomGateway,
    private roomService: RoomService,
  ) {}

  @OnEvent('ai.generate')
  async handleAiResponseEvent({ content, roomId }: AskDto) {
    const response = await this.vectorStore.generateResponse({ content });
    const message = await this.roomService.storeMessage({
      content: response.text,
      isFromAi: true,
      roomId,
    });

    this.roomGateway.server.emit('message.generated', message);
  }
}
