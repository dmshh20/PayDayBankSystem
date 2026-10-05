-- DropForeignKey
ALTER TABLE "LoggingTransaction" DROP CONSTRAINT "LoggingTransaction_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "LoggingTransaction" DROP CONSTRAINT "LoggingTransaction_senderId_fkey";

-- CreateTable
CREATE TABLE "_LoggingTransactionToWallet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LoggingTransactionToWallet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LoggingTransactionToWallet_B_index" ON "_LoggingTransactionToWallet"("B");

-- AddForeignKey
ALTER TABLE "_LoggingTransactionToWallet" ADD CONSTRAINT "_LoggingTransactionToWallet_A_fkey" FOREIGN KEY ("A") REFERENCES "LoggingTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoggingTransactionToWallet" ADD CONSTRAINT "_LoggingTransactionToWallet_B_fkey" FOREIGN KEY ("B") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
