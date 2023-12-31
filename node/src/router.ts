import { Router } from "express";
import { usersController } from "./controller";

export const usersRouter = Router();

usersRouter.post(
  "/",
  async (request, response, next) =>
    await usersController.insert(request, response, next)
);
