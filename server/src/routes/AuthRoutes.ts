import { Router } from "express";
import { register } from "../controller/AuthController";
import { tryCatch } from "../utlis/tryCatch";

const AuthRoutes = Router();

AuthRoutes.post("/signup", tryCatch(register));

export { AuthRoutes };
