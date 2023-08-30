import { Injectable } from '@nestjs/common';
import { Prisma, Embedding } from '@prisma/client';
import { PrismaVectorStore } from 'langchain/vectorstores/prisma';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { Document } from 'langchain/document';
import { LLM } from 'langchain/dist/llms/base';
import { RetrievalQAChain } from 'langchain/chains';

import { PrismaService } from './prisma.service';

@Injectable()
export class VectorStoreService {
  #embeddings = new CohereEmbeddings({ apiKey: process.env.COHERE_API_KEY });
  constructor(private prismaService: PrismaService) {}

  async generateEmbeddings({
    documentContent,
    documentId,
    roomId,
  }: {
    documentContent: Document<Record<string, any>>[][];
    documentId: string;
    roomId: number;
  }) {
    const vectorStore = PrismaVectorStore.withModel<Embedding>(
      this.prismaService,
    ).create(this.#embeddings, {
      prisma: Prisma,
      tableName: 'Embedding',
      vectorColumnName: 'vector',
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    });

    await vectorStore.addModels(
      await this.prismaService.$transaction(
        documentContent.flat().map((content) =>
          this.prismaService.embedding.create({
            data: { content: content.pageContent, documentId, roomId },
          }),
        ),
      ),
    );
  }

  async generateResponse({
    content,
    roomId,
    model,
  }: {
    content: string;
    roomId: number;
    model: LLM;
  }) {
    const vectorStore = PrismaVectorStore.withModel<Embedding>(
      this.prismaService,
    ).create(this.#embeddings, {
      prisma: Prisma,
      tableName: 'Embedding',
      vectorColumnName: 'vector',
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
      filter: { roomId: { equals: roomId } },
    });
    const vectorStoreRetriever = vectorStore.asRetriever({
      verbose: true,
    });
    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever, {
      verbose: true,
    });
    const result = await chain.call({
      query: content,
    });

    return result;
  }
}
