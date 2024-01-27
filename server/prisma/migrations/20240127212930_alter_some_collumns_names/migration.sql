/*
  Warnings:

  - You are about to drop the column `game_date` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `game_time` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `game_date` on the `ads` table. All the data in the column will be lost.
  - You are about to drop the column `game_time` on the `ads` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamId,gameDate]` on the table `ads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameDate` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameTime` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameDate` to the `ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameTime` to the `ads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_fromTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_receiverTeamId_fkey";

-- DropForeignKey
ALTER TABLE "ads" DROP CONSTRAINT "ads_teamId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_gameId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_userId_fkey";

-- DropIndex
DROP INDEX "ads_teamId_game_date_key";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "game_date",
DROP COLUMN "game_time",
ADD COLUMN     "gameDate" DATE NOT NULL,
ADD COLUMN     "gameTime" TIME NOT NULL;

-- AlterTable
ALTER TABLE "ads" DROP COLUMN "game_date",
DROP COLUMN "game_time",
ADD COLUMN     "gameDate" DATE NOT NULL,
ADD COLUMN     "gameTime" TIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ads_teamId_gameDate_key" ON "ads"("teamId", "gameDate");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_fromTeamId_fkey" FOREIGN KEY ("fromTeamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_receiverTeamId_fkey" FOREIGN KEY ("receiverTeamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
