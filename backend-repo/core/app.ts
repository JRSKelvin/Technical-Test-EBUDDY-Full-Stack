import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import route from "../routes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", route);

export default app;
