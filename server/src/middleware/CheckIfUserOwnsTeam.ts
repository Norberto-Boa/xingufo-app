import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { TeamService } from "../services/TeamService";

export const UserOwnsTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userPayload = (req as any).user;

    // Get User data
    const user = await UserService.existsByEmail(userPayload.email);

    if (!user) {
      throw new Error(`Alguma coisa esta errada com a sua autenticação!`);
    }

    const { teamid } = req.params;

    const team = await TeamService.getTeamById(Number(teamid));

    if (!team) {
      return res.status(400).json({
        message: `Equipe não foi encontrada!`,
      });
    }

    if (user.id !== team.userId) {
      return res.status(400).json({
        message: `Não pode fazer mudanças em equipes que não lhe pertençam!`,
      });
    }

    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Algo aconteceu de errado no seu request.",
    });
  }
};
