import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/common/prisma.service';
import { VectorStoreService } from 'src/common/vector-store.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, PrismaService, VectorStoreService],
})
export class ChatModule {}
