/*
  Warnings:

  - You are about to drop the column `created_at` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `document_id` on the `Embedding` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `is_from_ai` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentId` to the `Embedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Embedding" DROP CONSTRAINT "Embedding_document_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_room_id_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "created_at",
DROP COLUMN "room_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Embedding" DROP COLUMN "document_id",
ADD COLUMN     "documentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "created_at",
DROP COLUMN "is_from_ai",
DROP COLUMN "room_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isFromAi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Embedding" ADD CONSTRAINT "Embedding_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
