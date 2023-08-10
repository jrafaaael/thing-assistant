import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { VectorStoreService } from 'src/common/vector-store.service';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private vectorStoreService: VectorStoreService,
  ) {}

  @Post('ingest')
  @UseInterceptors(FileInterceptor('file'))
  async ingest(@UploadedFile() file: Express.Multer.File) {
    console.time('upload');
    const room = await this.chatService.createRoom({ name: file.originalname });
    await this.chatService.generateEmbeddings(file, room.id);

    console.timeEnd('upload');
    return { msg: 'ok' };
  }

  @Get('ask')
  async ask() {
    const res = await this.vectorStoreService.generateResponse();
    console.log(res);
  }
}
