/*
  Warnings:

  - You are about to drop the column `status` on the `games` table. All the data in the column will be lost.
  - Changed the type of `homeTeamId` on the `games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `awayTeamId` on the `games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "status",
DROP COLUMN "homeTeamId",
ADD COLUMN     "homeTeamId" INTEGER NOT NULL,
DROP COLUMN "awayTeamId",
ADD COLUMN     "awayTeamId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "fromTeamId" INTEGER NOT NULL,
    "receiverTeamId" INTEGER NOT NULL,
    "game_time" TIME NOT NULL,
    "game_date" DATE NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_homeTeamId_awayTeamId_gameDate_key" ON "games"("homeTeamId", "awayTeamId", "gameDate");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_fromTeamId_fkey" FOREIGN KEY ("fromTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_receiverTeamId_fkey" FOREIGN KEY ("receiverTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
