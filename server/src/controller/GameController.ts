import { Request, Response } from "express";
import { GameService } from "../services/GameService";

export async function getGames(req: Request, res: Response): Promise<Response> {
  const { page } = req.query;

  const games = await GameService.getGames(Number(page));

  return res.status(200).json(games);
}

export async function getGameById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const game = await GameService.getGameById(Number(id));

  if (!game) {
    return res.status(404).json({ message: "O jogo não foi encontrado!" });
  }

  return res.status(200).json(game);
}

export async function deleteGame(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const game = await GameService.getGameById(Number(id));

  if (!game) {
    return res.status(404).json({ message: "O jogo não foi encontrado!" });
  }

  await GameService.delete(Number(id));

  return res.status(200).json(game);
}
