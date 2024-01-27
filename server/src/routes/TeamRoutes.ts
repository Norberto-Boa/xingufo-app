import { Router } from "express";
import {
  create,
  getAllTeams,
  getTeamById,
  getTeamByUser,
  updateUserTeam,
} from "../controller/TeamController";
import { tryCatch } from "../utlis/tryCatch";
import { requireUser } from "../middleware/RequireUser";

const TeamRoutes = Router();

// Create a new Team
TeamRoutes.post("/teams/create", requireUser, tryCatch(create));

// Get all teams
TeamRoutes.get("/teams", requireUser, tryCatch(getAllTeams));

// Get Team By Id
TeamRoutes.get("/teams/:id", requireUser, tryCatch(getTeamById));

// Get Team By User Id
TeamRoutes.get("/teams/user/:id", requireUser, tryCatch(getTeamByUser));

// Edit a Team
TeamRoutes.put("/teams/:id", requireUser, tryCatch(updateUserTeam));

export { TeamRoutes };
