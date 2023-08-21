import { Controller, Get, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('rooms')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('/:roomId/messages')
  async getPaginatedMessagesByRoomId(
    @Param('roomId') roomId: string,
    @Query('cursor') cursor: string = '-1',
  ) {
    const messages =
      cursor === '-1'
        ? await this.messagesService.getLatestMessages(+roomId)
        : await this.messagesService.getMessagesByCursor(+roomId, +cursor);

    // FIX: prevent extra call. Don't calculate `nextCursor` with the latests fetched message.
    // Instead, check if exists messages enought to another call.
    const nextCursor =
      messages.length < this.messagesService.TAKE ? null : messages.at(-1)?.id;

    return {
      messages,
      metadata: {
        nextCursor,
      },
    };
  }
}
