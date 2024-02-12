import { Game } from "@prisma/client";
import { prismaClient } from "../prisma/client";
import { GameDTO } from "../@types/Game";

export class GameService {
  public static async create({
    location,
    awayTeamId,
    gameDate,
    gameTime,
    homeTeamId,
  }: GameDTO): Promise<Game | null> {
    return await prismaClient.game.create({
      data: {
        gameDate,
        gameTime,
        location,
        awayTeamId,
        homeTeamId,
      },
    });
  }
}
