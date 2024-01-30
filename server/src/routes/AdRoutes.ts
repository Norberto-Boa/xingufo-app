import { Router } from "express";
import { requireUser } from "../middleware/RequireUser";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";
import { tryCatch } from "../utlis/tryCatch";
import { create, deleteAd, getAllAdsByTeam } from "../controller/AdController";

const AdRoutes = Router();

AdRoutes.get("/ads/:id", requireUser, tryCatch(getAllAdsByTeam));
AdRoutes.post("/ads/:id", requireUser, UserOwnsTeam, tryCatch(create));
AdRoutes.delete("/ads/:id", requireUser, UserOwnsTeam, tryCatch(deleteAd));

export { AdRoutes };
