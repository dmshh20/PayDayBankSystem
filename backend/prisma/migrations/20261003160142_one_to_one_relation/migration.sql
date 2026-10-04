/*
  Warnings:

  - You are about to drop the `_LoggingTransactionToWallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LoggingTransactionToWallet" DROP CONSTRAINT "_LoggingTransactionToWallet_A_fkey";

-- DropForeignKey
ALTER TABLE "_LoggingTransactionToWallet" DROP CONSTRAINT "_LoggingTransactionToWallet_B_fkey";

-- DropTable
DROP TABLE "_LoggingTransactionToWallet";

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
