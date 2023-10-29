import express, { NextFunction, Request, Response } from "express";
import { ExpressErrorsHandler } from "@gccunha015/express-errors-handler";
import { usersRouter } from "./router";

const app = express();
const errorsHandler = new ExpressErrorsHandler();

app.use(express.json());
app.use("/users", usersRouter);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) =>
    errorsHandler.handle(error, request, response, next)
);

export { app };
