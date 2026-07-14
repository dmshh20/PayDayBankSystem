/*
  Warnings:

  - Added the required column `mailId` to the `Inbox` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Inbox` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Inbox" ADD COLUMN     "mailId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" INTEGER NOT NULL;
