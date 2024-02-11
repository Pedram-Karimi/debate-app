/*
  Warnings:

  - You are about to drop the `ArgsAgainstRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArgsAgainstRoom" DROP CONSTRAINT "ArgsAgainstRoom_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ArgsAgainstRoom" DROP CONSTRAINT "ArgsAgainstRoom_roomId_fkey";

-- AlterTable
ALTER TABLE "DebateRoom" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ArgsAgainstRoom";

-- CreateTable
CREATE TABLE "ArgsInDebRoom" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArgsInDebRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArgsInDebRoom" ADD CONSTRAINT "ArgsInDebRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "DebateRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArgsInDebRoom" ADD CONSTRAINT "ArgsInDebRoom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
