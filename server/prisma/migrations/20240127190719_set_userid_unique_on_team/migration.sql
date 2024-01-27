/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `teams` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teams_userId_key" ON "teams"("userId");
