import { Router } from "express";
import { create } from "../controller/TeamController";
import { tryCatch } from "../utlis/tryCatch";
import { requireUser } from "../middleware/RequireUser";

const TeamRoutes = Router();

TeamRoutes.post("/team/create", requireUser, tryCatch(create));

export { TeamRoutes };
