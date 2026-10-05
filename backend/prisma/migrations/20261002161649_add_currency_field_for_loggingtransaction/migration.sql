/*
  Warnings:

  - Added the required column `currency` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoggingTransaction" ADD COLUMN     "currency" TEXT NOT NULL;
