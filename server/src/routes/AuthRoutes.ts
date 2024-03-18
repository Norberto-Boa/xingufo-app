import { Router } from "express";
import { getUserDetails, login, register } from "../controller/AuthController";
import { tryCatch } from "../utlis/tryCatch";
import { requireUser } from "../middleware/RequireUser";

const AuthRoutes = Router();

AuthRoutes.post("/signup", tryCatch(register));
AuthRoutes.post("/login", tryCatch(login));
AuthRoutes.get("/userinfo", requireUser, tryCatch(getUserDetails));

export { AuthRoutes };
