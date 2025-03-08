import express, { Router } from "express";
import apiController from "../controllers/api";

const router: Router = express.Router();

router.post("/create-user-data/", (req, res, next) => {
  apiController.usersCreate(req, res, next);
});

router.get("/fetch-user-data/", (req, res, next) => {
  apiController.usersGetAll(req, res, next);
});

router.get("/fetch-user-data/:id", (req, res, next) => {
  apiController.usersGetByID(req, res, next);
});

router.put("/update-user-data/:id", (req, res, next) => {
  apiController.usersUpdate(req, res, next);
});

router.delete("/delete-user-data/:id", (req, res, next) => {
  apiController.usersDelete(req, res, next);
});

export default router;
