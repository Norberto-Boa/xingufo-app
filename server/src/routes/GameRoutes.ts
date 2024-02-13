import { Router } from "express";
import { tryCatch } from "../utlis/tryCatch";
import { deleteGame, getGameById } from "../controller/GameController";
import { requireUser } from "../middleware/RequireUser";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";

const GameRoutes = Router();

GameRoutes.get(`/games/:id`, tryCatch(getGameById));
GameRoutes.delete(
  `/games/:id/:teamid`,
  requireUser,
  UserOwnsTeam,
  tryCatch(deleteGame)
);

export { GameRoutes };
