import { Router } from "express";
import { usersController } from "./controller";

export const usersRouter = Router();

usersRouter.get(
  "/:id",
  async (request, response, next) =>
    await usersController.findById(request, response, next)
);
usersRouter.get(
  "/",
  async (request, response, next) =>
    await usersController.findAll(request, response, next)
);
usersRouter.post(
  "/",
  async (request, response, next) =>
    await usersController.create(request, response, next)
);
