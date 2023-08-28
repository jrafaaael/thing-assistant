/*
  Warnings:

  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `room_id` on the `document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `room_id` on the `message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_room_id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_room_id_fkey";

-- AlterTable
ALTER TABLE "document" DROP COLUMN "room_id",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "message" DROP CONSTRAINT "message_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "room_id",
ADD COLUMN     "room_id" INTEGER NOT NULL,
ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "room" DROP CONSTRAINT "room_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "room_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
