import { Router } from "express";
import { tryCatch } from "../utlis/tryCatch";
import {
  deleteGame,
  getGameById,
  getGames,
} from "../controller/GameController";
import { requireUser } from "../middleware/RequireUser";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";

const GameRoutes = Router();

GameRoutes.get(`/games/:id`, tryCatch(getGameById));

GameRoutes.get(`/games`, tryCatch(getGames));

GameRoutes.delete(
  `/games/:id/:teamid`,
  requireUser,
  UserOwnsTeam,
  tryCatch(deleteGame)
);

export { GameRoutes };
