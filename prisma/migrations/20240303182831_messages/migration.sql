/*
  Warnings:

  - You are about to drop the column `chatters` on the `DebatePvP` table. All the data in the column will be lost.
  - You are about to drop the column `debateRoomId` on the `DebatePvP` table. All the data in the column will be lost.
  - You are about to drop the column `messages` on the `DebatePvP` table. All the data in the column will be lost.
  - Added the required column `chatter1` to the `DebatePvP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatter2` to the `DebatePvP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `replyId` to the `DebatePvP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `DebatePvP` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "DebatePvP" DROP COLUMN "chatters",
DROP COLUMN "debateRoomId",
DROP COLUMN "messages",
ADD COLUMN     "chatter1" TEXT NOT NULL,
ADD COLUMN     "chatter2" TEXT NOT NULL,
ADD COLUMN     "replyId" TEXT NOT NULL,
ADD COLUMN     "roomId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DebateMssg" (
    "id" TEXT NOT NULL,
    "mssg" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebateMssg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DebateMssg" ADD CONSTRAINT "DebateMssg_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "DebatePvP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
