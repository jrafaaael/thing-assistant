import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { VectorStoreService } from 'src/common/vector-store.service';
import { MessagesGateway } from '../messages.gateway';
import { MessagesService } from '../messages.service';
import { NewMessageDto } from '../dto/new-message.dto';

@Injectable()
export class AiListener {
  constructor(
    private vectorStore: VectorStoreService,
    private roomsGateway: MessagesGateway,
    private messagesService: MessagesService,
  ) {}

  @OnEvent('ai.generate')
  async handleAiResponseEvent({ content, roomId }: NewMessageDto) {
    const response = await this.vectorStore.generateResponse({ content });
    const message = await this.messagesService.storeMessage({
      content: response.text,
      isFromAi: true,
      roomId: +roomId,
    });

    this.roomsGateway.server.emit('message.generated', message);
  }
}
