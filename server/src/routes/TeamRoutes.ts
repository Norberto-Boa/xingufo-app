import { Router } from "express";
import {
  create,
  deleteTeam,
  getAllTeams,
  getTeamByEmail,
  getTeamById,
  getTeamByUser,
  updateUserTeam,
} from "../controller/TeamController";
import { tryCatch } from "../utlis/tryCatch";
import { requireUser } from "../middleware/RequireUser";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";

const TeamRoutes = Router();

// Create a new Team
TeamRoutes.post("/teams/create", requireUser, tryCatch(create));

// Get all teams
TeamRoutes.get("/teams", requireUser, tryCatch(getAllTeams));

// Get Team By Id
TeamRoutes.get("/teams/:id", requireUser, tryCatch(getTeamById));

// Get Team By User Id
TeamRoutes.get(
  "/teams/user/email/:email",
  requireUser,
  tryCatch(getTeamByEmail)
);

// Get Team By User Id
TeamRoutes.get("/teams/user/:id", requireUser, tryCatch(getTeamByUser));

// Edit a Team
TeamRoutes.put(
  "/teams/:teamid",
  requireUser,
  UserOwnsTeam,
  tryCatch(updateUserTeam)
);

// Delete Team
TeamRoutes.delete(
  "/teams/:id",
  requireUser,
  UserOwnsTeam,
  tryCatch(deleteTeam)
);

export { TeamRoutes };
