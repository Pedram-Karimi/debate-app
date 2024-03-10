/*
  Warnings:

  - You are about to drop the column `creatorHandle` on the `DebateRoom` table. All the data in the column will be lost.
  - You are about to drop the column `creatorImg` on the `DebateRoom` table. All the data in the column will be lost.
  - You are about to drop the column `creatorName` on the `DebateRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DebateRoom" DROP COLUMN "creatorHandle",
DROP COLUMN "creatorImg",
DROP COLUMN "creatorName";
