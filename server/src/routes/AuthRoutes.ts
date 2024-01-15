import { Router } from "express";
import { login, register } from "../controller/AuthController";
import { tryCatch } from "../utlis/tryCatch";

const AuthRoutes = Router();

AuthRoutes.post("/signup", tryCatch(register));
AuthRoutes.post("/login", tryCatch(login));

export { AuthRoutes };
