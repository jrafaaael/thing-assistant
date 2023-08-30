import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Document } from 'langchain/document';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { PrismaService } from 'src/common/prisma.service';
import { VectorStoreService } from 'src/common/vector-store.service';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1024,
  chunkOverlap: 256,
});

@Injectable()
export class RoomsService {
  constructor(
    private prismaService: PrismaService,
    private vectorStoreService: VectorStoreService,
  ) {}

  async getAll() {
    return await this.prismaService.room.findMany();
  }

  async create(data: Prisma.RoomCreateInput) {
    const room = await this.prismaService.room.create({
      data,
    });

    return room;
  }

  async generateEmbeddings(file: Express.Multer.File, roomId: number) {
    const document = await this.prismaService.document.create({
      data: {
        name: file.originalname,
        roomId,
      },
    });
    const blob = new Blob([file.buffer]);
    const loader = new PDFLoader(blob);
    const pages = await loader.load();
    const doc = await Promise.all(
      pages.map(
        async (doc) =>
          await splitter.splitDocuments([
            new Document({
              pageContent: doc.pageContent,
            }),
          ]),
      ),
    );

    await this.vectorStoreService.generateEmbeddings({
      documentContent: doc,
      documentId: document.id,
      roomId,
    });
  }
}
