/*
  Warnings:

  - You are about to drop the column `creatorId` on the `DebateRoom` table. All the data in the column will be lost.
  - Added the required column `title` to the `DebateRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DebateRoom" DROP CONSTRAINT "DebateRoom_creatorId_fkey";

-- AlterTable
ALTER TABLE "DebateRoom" DROP COLUMN "creatorId",
ADD COLUMN     "title" TEXT NOT NULL;
