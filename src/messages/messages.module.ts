import { Module } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma.service';
import { VectorStoreService } from 'src/common/vector-store.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { AiListener } from './listener/ai.listener';

@Module({
  controllers: [MessagesController],
  providers: [
    PrismaService,
    VectorStoreService,
    MessagesService,
    MessagesGateway,
    AiListener,
  ],
})
export class MessagesModule {}
