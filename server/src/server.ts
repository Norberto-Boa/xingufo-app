import { fastify } from "fastify";
import cors from "@fastify/cors";
import pino from "pino";
import { AuthRoutes } from "./routes/authRoutes";

const PORT: number | undefined = Number(process.env.port) || 3333;
const app = fastify({
  logger: pino({ level: "info" }),
});

app.register(cors);
app.register(AuthRoutes);

const start = async () => {
  try {
    await app.listen({ port: PORT });
    console.log("Server started Sucessfully");
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
