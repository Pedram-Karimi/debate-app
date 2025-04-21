/*
  Warnings:

  - Added the required column `challenger` to the `ReplyToDebate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReplyToDebate" ADD COLUMN     "challenger" TEXT NOT NULL;
