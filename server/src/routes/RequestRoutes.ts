import { Router } from "express";
import { requireUser } from "../middleware/RequireUser";
import { tryCatch } from "../utlis/tryCatch";
import {
  acceptRequest,
  createRequest,
  updateRequest,
} from "../controller/RequestController";
import { UserOwnsTeam } from "../middleware/CheckIfUserOwnsTeam";

const RequestRoutes = Router();

RequestRoutes.post(
  "/requests/:teamid",
  requireUser,
  UserOwnsTeam,
  tryCatch(createRequest)
);

RequestRoutes.put(
  "/requests/:teamid",
  requireUser,
  UserOwnsTeam,
  tryCatch(updateRequest)
);
RequestRoutes.put(
  "/requests/accept/:teamid",
  requireUser,
  UserOwnsTeam,
  tryCatch(acceptRequest)
);

export { RequestRoutes };
