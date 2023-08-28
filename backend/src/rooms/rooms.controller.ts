import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  async getAll() {
    return await this.roomsService.getAll();
  }

  @Post('ingest')
  @UseInterceptors(FileInterceptor('file'))
  async ingest(@UploadedFile() file: Express.Multer.File) {
    const room = await this.roomsService.create({
      name: file.originalname,
    });
    await this.roomsService.generateEmbeddings(file, room.id);

    return { msg: 'ok' };
  }
}
