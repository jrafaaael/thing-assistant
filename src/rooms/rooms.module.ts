import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { PrismaService } from 'src/common/prisma.service';
import { VectorStoreService } from 'src/common/vector-store.service';
import { MessagesController } from 'src/messages/messages.controller';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { AiListener } from './listener/ai.listener';

@Module({
  controllers: [RoomsController, MessagesController],
  imports: [EventEmitterModule.forRoot()],
  providers: [PrismaService, VectorStoreService, RoomsService, RoomsGateway, AiListener],
})
export class RoomsModule {}
