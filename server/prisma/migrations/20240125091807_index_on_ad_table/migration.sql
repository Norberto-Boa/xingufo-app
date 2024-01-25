/*
  Warnings:

  - You are about to drop the `Ad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_teamId_fkey";

-- DropTable
DROP TABLE "Ad";

-- CreateTable
CREATE TABLE "ads" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "game_date" DATE NOT NULL,
    "game_time" TIME NOT NULL,
    "location" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "ads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ads_teamId_game_date_key" ON "ads"("teamId", "game_date");

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
