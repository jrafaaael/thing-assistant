import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { VectorStoreService } from 'src/common/vector-store.service';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1024,
  chunkOverlap: 256,
});

@Controller('chat')
export class ChatController {
  constructor(private vectorStoreService: VectorStoreService) {}

  @Post('upload-resource')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.time('upload');
    const blob = new Blob([file.buffer]);
    const loader = new PDFLoader(blob);
    const docs = await loader.load();
    const content = await Promise.all(
      docs.map(
        async (doc) =>
          await splitter.splitDocuments([
            new Document({ pageContent: doc.pageContent }),
          ]),
      ),
    );

    this.vectorStoreService.ingest(content);

    console.timeEnd('upload');
    return { msg: 'ok' };
  }

  @Get('ask')
  async ask() {
    const res = await this.vectorStoreService.generateResponse();
    console.log(res);
  }
}
