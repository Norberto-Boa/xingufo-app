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

  /**
   * Function that gets the Ad by the ID
   *
   * @param id
   * @returns Ad | null |
   */
  public static async getAdById(id: number): Promise<Ad | null> {
    return await prismaClient.ad.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   * Function that gets Ads by the team Id
   *
   * @param teamId number
   * @returns Ad | null
   */

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

  /**
   * Funcion that gets the Ad by teamId and GameDate as they are unique
   *
   * @param teamId number
   * @param gameDate Date
   * @returns Ad | null
   */

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

  public static async update(
    id: number,
    { gameDate, gameTime, location }: Partial<AdDTO>
  ) {
    return await prismaClient.ad.update({
      where: {
        id,
      },
      data: {
        gameDate,
        gameTime,
        location,
      },
    });
  }

  /**
   *  Function that removes the ad from the table
   *
   * @param id number
   * @returns Ad | never
   */
  public static async delete(id: number) {
    return await prismaClient.ad.delete({
      where: {
        id,
      },
    });
  }
}
