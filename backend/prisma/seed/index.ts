import { PrismaClient } from '@prisma/client';
import { messages } from './data/messages';
import { rooms } from './data/rooms';

const prisma = new PrismaClient();

async function seed() {
  await prisma.$queryRaw`ALTER SEQUENCE IF EXISTS Room_id_seq RESTART WITH 1;`;
  await prisma.$queryRaw`ALTER SEQUENCE IF EXISTS Message_id_seq RESTART WITH 1;`;
  await prisma.$queryRaw`ALTER SEQUENCE IF EXISTS Embedding_id_seq RESTART WITH 1;`;
  await prisma.$queryRaw`ALTER SEQUENCE IF EXISTS Document_id_seq RESTART WITH 1;`;

  await prisma.room.createMany({
    data: rooms,
  });
  await prisma.message.createMany({
    data: messages,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
