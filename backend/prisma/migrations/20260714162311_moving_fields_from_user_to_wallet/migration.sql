/*
  Warnings:

  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cardIndex` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_cardIndex_key";

-- DropIndex
DROP INDEX "User_cardNumber_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "balance",
DROP COLUMN "cardIndex",
DROP COLUMN "cardNumber";

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardIndex" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_cardNumber_key" ON "Wallet"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_cardIndex_key" ON "Wallet"("cardIndex");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
