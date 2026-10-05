/*
  Warnings:

  - You are about to drop the column `sum` on the `LoggingTransaction` table. All the data in the column will be lost.
  - Added the required column `convertedSum` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumToSend` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoggingTransaction" DROP COLUMN "sum",
ADD COLUMN     "convertedSum" INTEGER NOT NULL,
ADD COLUMN     "sumToSend" INTEGER NOT NULL;
