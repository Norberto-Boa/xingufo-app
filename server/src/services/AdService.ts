import { Ad } from "@prisma/client";
import { AdDTO } from "../@types/Ad";
import { prismaClient } from "../prisma/client";

export class AdService {
  public static async create(
    userId: number,
    { teamId, gameDate, gameTime, location }: AdDTO
  ): Promise<Ad | null> {
    return await prismaClient.ad.create({
      data: {
        teamId,
        gameDate,
        gameTime,
        location,
      },
    });
  }
}
