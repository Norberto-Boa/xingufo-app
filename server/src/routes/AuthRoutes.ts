import { FastifyInstance } from "fastify";
import { register } from "../controller/AuthController";

async function AuthRoutes(app: FastifyInstance) {
  app.post("/signup", register);
}

export { AuthRoutes };
