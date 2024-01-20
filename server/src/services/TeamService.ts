import { TeamDTO } from "../@types/Team";
import { prismaClient } from "../prisma/client";
import { UserService } from "./userServices";

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
    const userAlreadyhasTeam = await UserService.checkIfUserHasTeam(userId);

    if (userAlreadyhasTeam) {
      throw new Error(`Somente pode ter uma equipa registada!`);
    }

    const teamAlreadyExists = await this.checkTeamByName(name);

    if (teamAlreadyExists) {
      throw new Error(`O nome ${name} já está ser usado!`);
    }

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
