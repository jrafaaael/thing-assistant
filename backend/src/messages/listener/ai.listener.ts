import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cohere } from 'langchain/llms/cohere';

import { VectorStoreService } from 'src/common/vector-store.service';
import { MessagesGateway } from '../messages.gateway';
import { MessagesService } from '../messages.service';

@Injectable()
export class AiListener {
  constructor(
    private vectorStore: VectorStoreService,
    private roomsGateway: MessagesGateway,
    private messagesService: MessagesService,
  ) {}

  @OnEvent('ai.generate')
  async handleAiResponseEvent({
    content,
    roomId,
  }: {
    content: string;
    roomId: number;
  }) {
    const response = await this.vectorStore.generateResponse({
      content,
      roomId,
      model: new Cohere({ apiKey: process.env.COHERE_API_KEY }),
    });
    const message = await this.messagesService.storeMessage({
      content: response.text,
      isFromAi: true,
      roomId: +roomId,
    });

    this.roomsGateway.server.emit('message.generated', message);
  }
}
