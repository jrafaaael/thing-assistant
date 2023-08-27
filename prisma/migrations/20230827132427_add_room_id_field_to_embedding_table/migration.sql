/*
  Warnings:

  - Added the required column `roomId` to the `Embedding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Embedding" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Embedding" ADD CONSTRAINT "Embedding_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
