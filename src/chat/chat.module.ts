import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatController } from './chat.controller';
import { PrismaService } from 'src/common/prisma.service';
import { VectorStoreService } from 'src/common/vector-store.service';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AiListener } from './listener/ai.listener';

@Module({
  controllers: [ChatController],
  imports: [EventEmitterModule.forRoot()],
  providers: [PrismaService, VectorStoreService, ChatService, ChatGateway, AiListener],
})
export class ChatModule {}
