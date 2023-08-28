// import { Embedding, Prisma, PrismaClient } from '@prisma/client';
// import { RetrievalQAChain } from 'langchain/chains';
// import { Document } from 'langchain/document';
// import { PrismaVectorStore } from 'langchain/vectorstores/prisma';

// export class VectorStore {
//   #prisma: PrismaClient;
//   #embeddings;
//   #model;
//   #vectorStore;

//   constructor(prisma, model, embeddings, documentId: string) {
//     this.#prisma = prisma;
//     this.#embeddings = embeddings;
//     this.#model = model;

//     this.#vectorStore = PrismaVectorStore.withModel<Embedding>(
//       this.#prisma,
//     ).create(this.#embeddings, {
//       prisma: Prisma,
//       tableName: 'Embedding',
//       vectorColumnName: 'vector',
//       columns: {
//         id: PrismaVectorStore.IdColumn,
//         content: PrismaVectorStore.ContentColumn,
//       },
//       filter: {
//         documentId: {
//           equals: documentId,
//         },
//       },
//     });
//   }

//   async generateEmbeddings(
//     content: Document<Record<string, any>>[][],
//     documentId: string,
//   ) {
//     await this.#vectorStore.addModels(
//       await this.#prisma.$transaction(
//         content.flat().map((content) =>
//           this.#prisma.embedding.create({
//             data: { content: content.pageContent, documentId },
//           }),
//         ),
//       ),
//     );
//   }

//   async generateResponse({ content }: { content: string }) {
//     const vectorStoreRetriever = this.#vectorStore.asRetriever({
//       verbose: true,
//     });
//     const chain = RetrievalQAChain.fromLLM(this.#model, vectorStoreRetriever, {
//       verbose: true,
//     });
//     const result = await chain.call({
//       query: content,
//     });

//     return result;
//   }
// }

// const results = await this.vectorStore.similaritySearch(content, 1);

// const embeddingModel = new CohereEmbeddings({
//   apiKey: process.env.COHERE_API_KEY,
// });
// const questionEmbedding = JSON.stringify(
//   await embeddingModel.embedQuery(content),
// );
// const relatedEmbeddings = await this.prismaService.$queryRaw<Embedding[]>`
//   SELECT e.id, e.content, e."documentId", e.vector::text
//   FROM "Embedding" e
//   JOIN "Document" d ON e."documentId"  = d.id
//   JOIN "Room" r ON d."roomId" = r.id
//   WHERE r.id = ${roomId}
//   ORDER BY e.vector <-> ${questionEmbedding}::vector
//   LIMIT 2;
// `;
// console.log(relatedEmbeddings);
