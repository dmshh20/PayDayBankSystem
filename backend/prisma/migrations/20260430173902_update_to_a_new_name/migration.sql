/*
  Warnings:

  - You are about to drop the column `userId` on the `LoggingTransaction` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `LoggingTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoggingTransaction" DROP COLUMN "userId",
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggingTransaction" ADD CONSTRAINT "LoggingTransaction_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
