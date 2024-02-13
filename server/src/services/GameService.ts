import { Game } from "@prisma/client";
import { prismaClient } from "../prisma/client";
import { GameDTO } from "../@types/Game";

export class GameService {
  /**
   *
   * @param GameDTO object
   * @returns Game --- object
   */

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

  public static async getGameById(id: number): Promise<Game | null> {
    return await prismaClient.game.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   *
   * @param id number
   * @returns Game
   */
  public static async delete(id: number) {
    return await prismaClient.game.delete({
      where: {
        id,
      },
    });
  }
}
