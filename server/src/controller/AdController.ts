import { Request, Response } from "express";
import { createAdValidator } from "../validators/Ad/CreateAdValidator";
import { AdService } from "../services/AdService";
import { deleteAdValidator } from "../validators/Ad/DeleteAdValidator";
import { UpdateAdValidator } from "../validators/Ad/UpdateAdValidator";
import { decryptedToken } from "../@types/Token";
import { TeamService } from "../services/TeamService";

export async function create(
  req: Request,
  res: Response
): Promise<Response | never> {
  const { gameDate, gameTime, location } = createAdValidator.parse(req.body);

  const userData: decryptedToken = (req as any).user;

  const team = await TeamService.getTeamByEmail(userData.email);

  if (!team) {
    return res.status(400).json({ messa: "Usuario nao tem equipe registada!" });
  }

  const teamId = team.id;

  const teamAlreadyHasAd = await AdService.getAdByTeamIdAndGameDate(
    teamId,
    gameDate
  );

  if (teamAlreadyHasAd) {
    return res.status(400).json({
      message: "A equipe ja fez um anuncio para esta data!",
    });
  }

  const ad = await AdService.create({ teamId, gameDate, gameTime, location });

  if (!ad) {
    return res.status(400).json({
      message: "Algo aconteceu durante a cricao, tente novamente!",
    });
  }

  return res.status(201).json(ad);
}

export async function getAds(req: Request, res: Response): Promise<Response> {
  const { page } = req.query;

  const ads = await AdService.getAds(Number(page));

  return res.status(200).json(ads);
}

export async function getAllAdsByTeam(req: Request, res: Response) {
  const { teamid } = req.params;

  const ads = await AdService.getAdsByTeamId(Number(teamid));

  return res.status(200).json({
    ads,
  });
}

export async function updateAd(
  req: Request,
  res: Response
): Promise<Response | never> {
  const { id, gameDate, gameTime, location } = UpdateAdValidator.parse(
    req.body
  );

  const ad = await AdService.getAdById(id);

  if (!ad) {
    return res.status(404).json({ message: "Nao encontramos o Anuncio!" });
  }

  const updatedAd = await AdService.update(id, {
    gameDate,
    gameTime,
    location,
  });

  return res.status(201).json({ old: ad, new: updatedAd });
}

export async function deleteAd(
  req: Request,
  res: Response
): Promise<Response | never> {
  const { id } = deleteAdValidator.parse(req.body);

  const ad = await AdService.getAdById(id);
  if (!ad) {
    return res.status(400).json({ message: "O anuncio nao foi encontrado!" });
  }

  const deletedAd = await AdService.delete(id);

  return res.status(200).json(deletedAd);
}
