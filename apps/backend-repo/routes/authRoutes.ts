import express, { Router } from "express";
import apiController from "../controllers/api";

const router: Router = express.Router();

router.post("/sign-up", (req, res, next) => {
  apiController.authSignUp(req, res, next);
});

router.post("/sign-in", (req, res, next) => {
  apiController.authSignIn(req, res, next);
});

export default router;
