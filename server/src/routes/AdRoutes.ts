import { Router } from "express";
import { requireUser } from "../middleware/RequireUser";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";
import { tryCatch } from "../utlis/tryCatch";
import {
  create,
  deleteAd,
  getAds,
  getAllAdsByTeam,
  updateAd,
} from "../controller/AdController";

const AdRoutes = Router();

AdRoutes.get("/ads", tryCatch(getAds));
AdRoutes.get("/ads/:teamid", requireUser, tryCatch(getAllAdsByTeam));
AdRoutes.post("/ads", requireUser, tryCatch(create));
AdRoutes.delete("/ads/:teamid", requireUser, UserOwnsTeam, tryCatch(deleteAd));
AdRoutes.put("/ads/:teamid", requireUser, UserOwnsTeam, tryCatch(updateAd));

export { AdRoutes };
