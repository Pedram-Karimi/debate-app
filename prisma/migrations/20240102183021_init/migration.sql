/*
  Warnings:

  - You are about to drop the column `created_at` on the `ArgsInDebRoom` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `DebateRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArgsInDebRoom" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "DebateRoom" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
