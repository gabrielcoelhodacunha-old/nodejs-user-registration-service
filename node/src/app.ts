import express, { NextFunction, Request, Response } from "express";
import { usersRouter } from "./router";
import { ApplicationError } from "./types";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
// Isolate this error handler as a library
app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ): void => {
    const _error =
      error instanceof ApplicationError ? error : new ApplicationError(error);
    // console = ILogger
    console.log(`Error origin: ${_error.origin}`);
    response.status(_error.statusCode).send({ error: _error.message });
  }
);

export { app };
