import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Controller('room')
export class MessagesController {
  constructor(private prismaService: PrismaService) {}

  @Get('/:roomId/messages')
  async getAllMessagesByRoomId(@Param('roomId') roomId: string) {
    return this.prismaService.message.findMany({
      where: {
        roomId,
      },
    });
  }
}
