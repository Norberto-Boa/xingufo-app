-- CreateTable
CREATE TABLE "Ad" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "game_date" DATE NOT NULL,
    "game_time" TIME NOT NULL,
    "location" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
