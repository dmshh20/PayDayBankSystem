/*
  Warnings:

  - You are about to drop the column `currency` on the `LoggingTransaction` table. All the data in the column will be lost.
  - Added the required column `recipientCurrency` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderCurrency` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoggingTransaction" DROP COLUMN "currency",
ADD COLUMN     "recipientCurrency" TEXT NOT NULL,
ADD COLUMN     "senderCurrency" TEXT NOT NULL;
