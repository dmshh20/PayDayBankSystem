-- CreateTable
CREATE TABLE "Inbox" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Inbox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
