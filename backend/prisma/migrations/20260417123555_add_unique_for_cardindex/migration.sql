/*
  Warnings:

  - A unique constraint covering the columns `[cardIndex]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_cardIndex_key" ON "User"("cardIndex");
