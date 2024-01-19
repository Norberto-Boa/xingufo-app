/*
  Warnings:

  - The primary key for the `games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[homeTeamId,awayTeamId,gameDate]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "games" DROP CONSTRAINT "games_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "games_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "homeTeamGoals" INTEGER NOT NULL,
    "awayTeamGoals" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "results_gameId_key" ON "results"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "games_homeTeamId_awayTeamId_gameDate_key" ON "games"("homeTeamId", "awayTeamId", "gameDate");

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
