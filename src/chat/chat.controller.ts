import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

@Controller('chat') 
export class ChatController {
  @Post('upload-resource')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.time('upload')
    console.log(file);
    const blob = new Blob([file.buffer]);
    const loader = new PDFLoader(blob);
    const docs = await loader.load();
    console.log(docs);
    console.timeEnd('upload');
    return { msg: 'ok' };
  }
}
