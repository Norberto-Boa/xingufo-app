import { TeamDTO } from "../@types/Team";
import { prismaClient } from "../prisma/client";

export class TokenService {
  /**
   * Function to create a new Team
   * @param teamData
   *
   * @return
   */
  public static async create(
    userId: number,
    { name, badge, city, foundedAt, province, homeField }: TeamDTO
  ) {

    const team = await prismaClient.team.create({
      data: {
        name,
        badge,
        city,
        foundedAt,
        province,
        userId,
        homeField,
      },
    });

    return team;
  }

  private static async checkTeamByName(name: string) {
    const team = await prismaClient.team.findFirst({
      where: {
        name,
      },
    });

    if (team) {
      return true;
    } else {
      return false;
    }
  }
}
