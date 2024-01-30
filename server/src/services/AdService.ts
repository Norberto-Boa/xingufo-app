import { Ad } from "@prisma/client";
import { AdDTO } from "../@types/Ad";
import { prismaClient } from "../prisma/client";

export class AdService {
  /**
   * Function to create the new Ad
   *
   * @param Ad AdDTO
   * @returns Ad
   */

  public static async create({
    teamId,
    gameDate,
    gameTime,
    location,
  }: AdDTO): Promise<Ad | null> {
    return await prismaClient.ad.create({
      data: {
        teamId,
        gameDate,
        gameTime,
        location,
      },
    });
  }

  public static async getAdById(id: number): Promise<Ad | null> {
    return await prismaClient.ad.findFirst({
      where: {
        id,
      },
    });
  }

  public static async getAdsByTeamId(teamId: number) {
    return await prismaClient.ad.findMany({
      where: {
        teamId,
      },
      include: {
        team: true,
      },
    });
  }

  public static async getAdByTeamIdAndGameDate(teamId: number, gameDate: Date) {
    return await prismaClient.ad.findFirst({
      where: {
        AND: [
          {
            teamId,
          },
          {
            gameDate,
          },
        ],
      },
    });
  }

  public static async delete(id: number) {
    return await prismaClient.ad.delete({
      where: {
        id,
      },
    });
  }
}
