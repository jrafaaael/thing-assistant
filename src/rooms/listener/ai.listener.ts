import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { VectorStoreService } from 'src/common/vector-store.service';
import { AskDto } from '../dto/ask.dto';
import { RoomsGateway } from '../rooms.gateway';
import { RoomsService } from '../rooms.service';

@Injectable()
export class AiListener {
  constructor(
    private vectorStore: VectorStoreService,
    private roomsGateway: RoomsGateway,
    private roomsService: RoomsService,
  ) {}

  @OnEvent('ai.generate')
  async handleAiResponseEvent({ content, roomId }: AskDto) {
    const response = await this.vectorStore.generateResponse({ content });
    const message = await this.roomsService.storeMessage({
      content: response.text,
      isFromAi: true,
      roomId: +roomId,
    });

    this.roomsGateway.server.emit('message.generated', message);
  }
}
