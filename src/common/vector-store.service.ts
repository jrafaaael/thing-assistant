import { Injectable } from '@nestjs/common';
import { Prisma, Embedding } from '@prisma/client';
import { PrismaVectorStore } from 'langchain/vectorstores/prisma';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { Document } from 'langchain/document';

import { PrismaService } from './prisma.service';

@Injectable()
export class VectorStoreService {
  private vectorStore;

  // TODO: improve this code
  constructor(private prismaService: PrismaService) {
    this.vectorStore = PrismaVectorStore.withModel<Embedding>(
      this.prismaService,
    ).create(new CohereEmbeddings({ apiKey: process.env.COHERE_API_KEY }), {
      prisma: Prisma,
      tableName: 'Embedding',
      vectorColumnName: 'vector',
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    });
  }

  async generateEmbeddings(
    content: Document<Record<string, any>>[][],
    documentId: string,
  ) {
    await this.vectorStore.addModels(
      await this.prismaService.$transaction(
        content.flat().map((content) =>
          this.prismaService.embedding.create({
            data: { content: content.pageContent, documentId },
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
