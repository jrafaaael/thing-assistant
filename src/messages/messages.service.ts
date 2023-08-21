import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class MessagesService {
  public TAKE = 25;

  constructor(private prismaService: PrismaService) {}

  async getLatestMessages(roomId: number) {
    return await this.prismaService.message.findMany({
      take: this.TAKE,
      where: {
        roomId,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }

  async getMessagesByCursor(roomId: number, cursor: number) {
    return await this.prismaService.message.findMany({
      take: this.TAKE,
      where: {
        AND: [{ roomId }, { id: { lt: cursor } }],
      },
      cursor: {
        id: cursor,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }
}
