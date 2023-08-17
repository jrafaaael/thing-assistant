import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  async getAll() {
    return await this.roomService.getAll();
  }

  @Post('ingest')
  @UseInterceptors(FileInterceptor('file'))
  async ingest(@UploadedFile() file: Express.Multer.File) {
    const room = await this.roomService.createRoom({ name: file.originalname });
    await this.roomService.generateEmbeddings(file, room.id);

    return { msg: 'ok' };
  }
}
