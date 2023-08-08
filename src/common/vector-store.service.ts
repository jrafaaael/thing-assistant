import { Injectable } from '@nestjs/common';
import { Prisma, Document as DocumentModel } from '@prisma/client';
import { PrismaVectorStore } from 'langchain/vectorstores/prisma';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { Document } from 'langchain/document';

import { PrismaService } from './prisma.service';

@Injectable()
export class VectorStoreService {
  private vectorStore;

  // TODO: improve this code
  constructor(private prismaService: PrismaService) {
    this.vectorStore = PrismaVectorStore.withModel<DocumentModel>(
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
  }

  async ingest(content: Document<Record<string, any>>[][]) {
    await this.vectorStore.addModels(
      await this.prismaService.$transaction(
        content.flat().map((content) =>
          this.prismaService.document.create({
            data: { content: content.pageContent },
          }),
        ),
      ),
    );
  }

  async generateResponse() {
    const resultOne = await this.vectorStore.similaritySearch(
      'What is the JavaScript framework used in this examples?',
      1,
    );

    return resultOne;
  }
}
