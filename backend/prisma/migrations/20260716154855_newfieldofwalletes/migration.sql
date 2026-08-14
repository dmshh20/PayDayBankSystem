/*
  Warnings:

  - Added the required column `cardName` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "cardName" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL;
