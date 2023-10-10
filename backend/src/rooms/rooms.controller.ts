import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';
import { UploadedFileDto } from './dto/room-with-message.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  async getAll() {
    return await this.roomsService.getAll();
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    return await this.roomsService.getRoomById(id);
  }

  @Post('ingest')
  @UseInterceptors(FileInterceptor('file'))
  async ingest(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadedFile: UploadedFileDto,
  ) {
    const room = await this.roomsService.create({
      name: file.originalname,
    });
    await this.roomsService.generateEmbeddings(file, room.id);

    return { msg: 'ok', tmpId: uploadedFile.tmpId };
  }
}
