import { Team } from "@prisma/client";
import { TeamDTO } from "../@types/Team";
import { prismaClient } from "../prisma/client";

export class TeamService {
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
    return await prismaClient.team.create({
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
  }

  public static async checkTeamByName(name: string) {
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

  public static async getAllTeams(): Promise<Team[]> {
    return await prismaClient.team.findMany();
  }

  public static async getTeamById(id: number): Promise<Team | null> {
    return await prismaClient.team.findFirst({
      where: {
        id,
      },
    });
  }
}
