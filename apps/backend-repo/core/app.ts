import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

const result = dotenv.config();
if (result.error) {
  console.log(`Error Loading Environment File`, result.error);
}

import route from "../routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", route);

export default app;
