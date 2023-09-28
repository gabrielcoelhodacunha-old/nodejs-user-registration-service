import express, { NextFunction, Request, Response } from "express";
import { usersRouter } from "../features";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).send(error.stack);
  }
);

export { app };
