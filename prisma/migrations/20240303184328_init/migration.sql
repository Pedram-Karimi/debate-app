/*
  Warnings:

  - Added the required column `creatorImg` to the `DebateRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorName` to the `DebateRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DebateRoom" ADD COLUMN     "creatorImg" TEXT NOT NULL,
ADD COLUMN     "creatorName" TEXT NOT NULL;
