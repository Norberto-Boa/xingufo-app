import { Router } from "express";
import { create, getAllTeams } from "../controller/TeamController";
import { tryCatch } from "../utlis/tryCatch";
import { requireUser } from "../middleware/RequireUser";

const TeamRoutes = Router();

// Create a new Team
TeamRoutes.post("/team/create", requireUser, tryCatch(create));

// Get all teams
TeamRoutes.get("/teams", requireUser, tryCatch(getAllTeams));

export { TeamRoutes };
