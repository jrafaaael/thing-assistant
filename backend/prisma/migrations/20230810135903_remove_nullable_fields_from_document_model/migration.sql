/*
  Warnings:

  - Made the column `name` on table `Document` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roomId` on table `Document` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_roomId_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "roomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
