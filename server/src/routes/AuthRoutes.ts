import { Router } from "express";
import { UpdateUserData, getUserDetails, login, register } from "../controller/AuthController";
import { tryCatch } from "../utlis/tryCatch";
import { requireUser } from "../middleware/RequireUser";

const AuthRoutes = Router();


AuthRoutes.post("/signup", tryCatch(register));
AuthRoutes.post("/login", tryCatch(login));
AuthRoutes.get("/userinfo", requireUser, tryCatch(getUserDetails));
AuthRoutes.put("/auth/update", requireUser, tryCatch(UpdateUserData));

export { AuthRoutes };
