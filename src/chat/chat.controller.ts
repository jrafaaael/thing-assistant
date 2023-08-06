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
import { PrismaVectorStore } from 'langchain/vectorstores/prisma';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { Prisma, Document as PrismaDocument } from '@prisma/client';

import { PrismaService } from 'src/common/prisma.service';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1024,
  chunkOverlap: 256,
});

@Controller('chat')
export class ChatController {
  constructor(private prismaService: PrismaService) {}

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

    const vectorStore = PrismaVectorStore.withModel<PrismaDocument>(
      this.prismaService,
    ).create(new CohereEmbeddings({ apiKey: process.env.COHERE_API_KEY }), {
      prisma: Prisma,
      tableName: 'Document',
      vectorColumnName: 'vector',
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    });

    await vectorStore.addModels(
      await this.prismaService.$transaction(
        content.flat().map((content) =>
          this.prismaService.document.create({
            data: { content: content.pageContent },
          }),
        ),
      ),
    );

    console.timeEnd('upload');
    return { msg: 'ok' };
  }
}
