/*
  Warnings:

  - You are about to drop the `ArgsInDebRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[handle]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `handle` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArgsInDebRoom" DROP CONSTRAINT "ArgsInDebRoom_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ArgsInDebRoom" DROP CONSTRAINT "ArgsInDebRoom_roomId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "handle" TEXT NOT NULL;

-- DropTable
DROP TABLE "ArgsInDebRoom";

-- DropTable
DROP TABLE "ChatRoom";

-- CreateTable
CREATE TABLE "DebatePvP" (
    "id" TEXT NOT NULL,
    "messages" TEXT[],
    "debateRoomId" TEXT NOT NULL,
    "chatters" TEXT[],

    CONSTRAINT "DebatePvP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyToDebate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "readyStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReplyToDebate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- AddForeignKey
ALTER TABLE "ReplyToDebate" ADD CONSTRAINT "ReplyToDebate_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "DebateRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyToDebate" ADD CONSTRAINT "ReplyToDebate_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
