import { Router } from "express";
import { requireUser } from "../middleware/RequireUser";
import { tryCatch } from "../utlis/tryCatch";
import { createRequest } from "../controller/RequestController";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";

const RequestRoutes = Router();

RequestRoutes.post(
  "/requests/:id",
  requireUser,
  UserOwnsTeam,
  tryCatch(createRequest)
);

export { RequestRoutes };
