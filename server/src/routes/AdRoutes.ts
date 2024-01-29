import { Router } from "express";
import { requireUser } from "../middleware/RequireUser";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";
import { tryCatch } from "../utlis/tryCatch";
import { create } from "../controller/AdController";

const AdRoutes = Router();

AdRoutes.post("/ads/:id", requireUser, UserOwnsTeam, tryCatch(create));

export { AdRoutes };
