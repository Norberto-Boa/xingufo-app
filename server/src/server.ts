import express from "express";
import cors from "cors";
import { AuthRoutes } from "./routes/AuthRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(AuthRoutes);

const PORT: number | undefined = Number(process.env.port) || 3333;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
