import { Request, Response } from "express";
import { Team } from "@prisma/client";
import { decryptedToken } from "../@types/token";
import { TeamService } from "../services/TeamService";
import { UserService } from "../services/UserServices";
import { createTeamValidator } from "../validators/Team/CreateTeamValidator";

export async function create(
  req: Request,
  res: Response
): Promise<Response | undefined> {
  const { name, badge, city, foundedAt, province, homeField } =
    createTeamValidator.parse(req.body);

  const userData: decryptedToken = (req as any).user;

  // Get the user information
  const user = await UserService.existsByEmail(userData.email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // Check if user already has a team
  const userAlreadyhasTeam = await UserService.checkIfUserHasTeam(user.id);

  if (userAlreadyhasTeam) {
    throw new Error(`Somente pode ter uma equipa registada!`);
  }

  // Check if name has already been registered
  const teamAlreadyExists = await TeamService.checkTeamByName(name);

  if (teamAlreadyExists) {
    throw new Error(`O nome ${name} já está ser usado!`);
  }

  const team = await TeamService.create(user.id, {
    name,
    badge,
    city,
    foundedAt,
    province,
    homeField,
  });

  // Store the team in the database
  return res.status(200).json(team);
}
