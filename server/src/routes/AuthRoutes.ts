import { Router } from "express";
import { register } from "../controller/AuthController";

const AuthRoutes = Router();

AuthRoutes.post("/register", register);

export { AuthRoutes };
