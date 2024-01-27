import { Request, Response } from "express";
import { Team } from "@prisma/client";
import { decryptedToken } from "../@types/Token";
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

export async function getAllTeams(
  req: Request,
  res: Response
): Promise<Response> {
  const teams = await TeamService.getAllTeams();

  return res.status(200).json(teams);
}

export async function getTeamById(
  req: Request,
  res: Response
): Promise<Response | undefined> {
  const { id } = req.params;

  const team = await TeamService.getTeamById(Number(id));

  if (!team) {
    throw new Error(`Equipe não foi encontrada!`);
  }

  return res.status(200).json(team);
}

export async function getTeamByUser(
  req: Request,
  res: Response
): Promise<Response | undefined> {
  const { id } = req.params;

  const user = await UserService.getUserById(Number(id));

  if (!user) {
    throw new Error("O usuário não foi encontrado!");
  }

  const team = await TeamService.getTeamByUserId(user.id);

  return res.status(200).json(team);
}

export async function updateUserTeam(
  req: Request,
  res: Response
): Promise<Response | never> {
  // Fetch the team id
  const { id } = req.params;

  // Get the team information
  const team = await TeamService.getTeamById(Number(id));

  if (!team) {
    throw new Error(`Equipe não foi encontrada!`);
  }

  // Get the User Id
  const user = (req as any).user as decryptedToken;

  // Check if the user owns the team
  if (user.email !== team.user.email) {
    throw new Error(`O usuário só pode actualizar sua própria equipe!`);
  }

  // Validate the fields
  const { name, badge, city, foundedAt, homeField, province } =
    createTeamValidator.partial().parse(req.body);

  const updatedTeam = await TeamService.updateTeam(Number(id), {
    name,
    badge,
    city,
    foundedAt,
    homeField,
    province,
  });

  return res.status(200).json(updatedTeam);
}
