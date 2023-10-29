import { Router } from "express";
import { usersController } from "./controller/UsersController";

export const usersRouter = Router();

usersRouter.post(
  "/",
  async (request, response, next) =>
    await usersController.insert(request, response, next)
);
