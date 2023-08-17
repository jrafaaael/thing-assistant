import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { PrismaService } from 'src/common/prisma.service';
import { VectorStoreService } from 'src/common/vector-store.service';
import { MessagesController } from 'src/messages/messages.controller';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { AiListener } from './listener/ai.listener';

@Module({
  controllers: [RoomController, MessagesController],
  imports: [EventEmitterModule.forRoot()],
  providers: [PrismaService, VectorStoreService, RoomService, RoomGateway, AiListener],
})
export class RoomModule {}
