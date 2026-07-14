/*
  Warnings:

  - Added the required column `type` to the `Inbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inbox" ADD COLUMN     "type" TEXT NOT NULL;
