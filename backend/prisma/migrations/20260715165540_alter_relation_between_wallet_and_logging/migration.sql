-- DropForeignKey
ALTER TABLE "LoggingTransaction" DROP CONSTRAINT "LoggingTransaction_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "LoggingTransaction" DROP CONSTRAINT "LoggingTransaction_senderId_fkey";

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Wallet"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Wallet"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
