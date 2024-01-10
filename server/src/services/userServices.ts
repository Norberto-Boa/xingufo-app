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

  static async existByEmailOrCellphone(email: string, cellphone: string) {
    return await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            cellphone,
          },
          {
            email,
          },
        ],
      },
    });
  }
}
