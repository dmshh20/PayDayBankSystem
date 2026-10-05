/*
  Warnings:

  - You are about to drop the column `recipientId` on the `LoggingTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `LoggingTransaction` table. All the data in the column will be lost.
  - Added the required column `recipientWalletId` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderWalletId` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LoggingTransaction" DROP CONSTRAINT "LoggingTransaction_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "LoggingTransaction" DROP CONSTRAINT "LoggingTransaction_senderId_fkey";

-- AlterTable
ALTER TABLE "LoggingTransaction" DROP COLUMN "recipientId",
DROP COLUMN "senderId",
ADD COLUMN     "recipientWalletId" INTEGER NOT NULL,
ADD COLUMN     "senderWalletId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_senderWalletId_fkey" FOREIGN KEY ("senderWalletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_recipientWalletId_fkey" FOREIGN KEY ("recipientWalletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
