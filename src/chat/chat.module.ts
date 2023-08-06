import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [ChatController],
  providers: [PrismaService],
})
export class ChatModule {}
