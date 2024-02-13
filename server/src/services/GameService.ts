import { Game } from "@prisma/client";
import { prismaClient } from "../prisma/client";
import { GameDTO } from "../@types/Game";

export class GameService {
  /**
   * Function that creates a game
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

  public static async getGames(page: number): Promise<Game[] | null> {
    const gamesPerPage = 8;
    const start = page === 1 ? (page - 1) * gamesPerPage : 0;
    return await prismaClient.game.findMany({
      orderBy: {
        gameDate: "desc",
      },
      skip: start,
      take: gamesPerPage,
      include: {
        home: true,
        away: true,
      },
    });
  }

  /**
   * Function that gets a single game
   *
   * @param id number
   * @returns Game object
   */
  public static async getGameById(id: number): Promise<Game | null> {
    return await prismaClient.game.findFirst({
      where: {
        id,
      },
      include: {
        home: true,
        away: true,
      },
    });
  }

  /**
   * Function that deletes a game
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
