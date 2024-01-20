import { Role } from "@prisma/client";
import { UserDTO } from "../@types/User";
import { prismaClient } from "../prisma/client";
import { hash } from "bcrypt";

export class UserService {
  static async createUser(userDTO: UserDTO) {
    const hashedPassword = await hash(userDTO.password, 10);

    const userData = {
      name: userDTO.name,
      email: userDTO.email,
      password: hashedPassword,
      cellphone: userDTO.cellphone,
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await prismaClient.user.create({
      data: userData,
    });
  }

  static async existsByEmail(email: string) {
    return await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }

  static async existsByCellphone(cellphone: string) {
    return await prismaClient.user.findFirst({
      where: {
        cellphone,
      },
    });
  }

  static async checkIfUserHasTeam(userId: number) {
    // Get team by the User Id
    const team = await prismaClient.team.findFirst({
      where: {
        userId,
      },
    });

    if (team) {
      return true;
    }

    if (!team) {
      return false;
    }
  }
}
