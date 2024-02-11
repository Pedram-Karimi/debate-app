-- AlterTable
ALTER TABLE "DebateRoom" ADD COLUMN     "creatorId" TEXT;

-- AddForeignKey
ALTER TABLE "DebateRoom" ADD CONSTRAINT "DebateRoom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
