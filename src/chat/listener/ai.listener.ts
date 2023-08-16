import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { VectorStoreService } from 'src/common/vector-store.service';
import { AskDto } from '../dto/ask.dto';
import { ChatGateway } from '../chat.gateway';
import { ChatService } from '../chat.service';

@Injectable()
export class AiListener {
  constructor(
    private vectorStore: VectorStoreService,
    private chatGateway: ChatGateway,
    private chatService: ChatService,
  ) {}

  @OnEvent('ai.generate')
  async handleAiResponseEvent({ content, roomId }: AskDto) {
    const response = await this.vectorStore.generateResponse({ content });
    const message = await this.chatService.storeMessage({
      content: response.text,
      is_from_ai: true,
      roomId,
    });

    this.chatGateway.server.emit('message.generated', message);
  }
}
