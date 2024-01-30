import { Request, Response } from "express";
import { createAdValidator } from "../validators/Ad/CreateAdValidator";
import { AdService } from "../services/AdService";
import { deleteAdValidator } from "../validators/Ad/DeleteAdValidator";

export async function create(
  req: Request,
  res: Response
): Promise<Response | never> {
  const { id } = req.params;

  const { gameDate, gameTime, location } = createAdValidator.parse(req.body);

  const teamId = Number(id);

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

export async function getAllAdsByTeam(req: Request, res: Response) {
  const { id } = req.params;

  const ads = await AdService.getAdsByTeamId(Number(id));

  return res.status(200).json({
    ads,
  });
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
