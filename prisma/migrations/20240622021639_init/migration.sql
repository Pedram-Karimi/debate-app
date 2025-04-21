/*
  Warnings:

  - Added the required column `currCat` to the `DebateRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statement` to the `DebateRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DebateRoom" ADD COLUMN     "currCat" TEXT NOT NULL,
ADD COLUMN     "media" TEXT[],
ADD COLUMN     "statement" TEXT NOT NULL;
