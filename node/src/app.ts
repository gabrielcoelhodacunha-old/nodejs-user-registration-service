import express, { NextFunction, Request, Response } from "express";
import { usersRouter } from "./router";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    response.status(500).send(error.stack);
  }
);

export { app };
