/*
  Warnings:

  - Made the column `creatorId` on table `DebateRoom` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DebateRoom" DROP CONSTRAINT "DebateRoom_creatorId_fkey";

-- AlterTable
ALTER TABLE "DebateRoom" ALTER COLUMN "creatorId" SET NOT NULL;

-- CreateTable
CREATE TABLE "ArgsAgainstRoom" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ArgsAgainstRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DebateRoom" ADD CONSTRAINT "DebateRoom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArgsAgainstRoom" ADD CONSTRAINT "ArgsAgainstRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "DebateRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArgsAgainstRoom" ADD CONSTRAINT "ArgsAgainstRoom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
