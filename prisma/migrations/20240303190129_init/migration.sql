/*
  Warnings:

  - You are about to drop the column `readyStatus` on the `ReplyToDebate` table. All the data in the column will be lost.
  - You are about to drop the `DebatePvP` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `replyId` to the `DebateMssg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorHandle` to the `DebateRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DebateMssg" DROP CONSTRAINT "DebateMssg_writerId_fkey";

-- AlterTable
ALTER TABLE "DebateMssg" ADD COLUMN     "replyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DebateRoom" ADD COLUMN     "creatorHandle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReplyToDebate" DROP COLUMN "readyStatus";

-- DropTable
DROP TABLE "DebatePvP";

-- AddForeignKey
ALTER TABLE "DebateMssg" ADD CONSTRAINT "DebateMssg_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "ReplyToDebate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
