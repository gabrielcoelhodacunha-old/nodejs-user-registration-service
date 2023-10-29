import type { RequestHandler } from "express";
import type { IControllerOptionsTypes } from "./types";

export interface IController {
  insert: RequestHandler;
}

export interface IControllerOptions<TYPES extends IControllerOptionsTypes> {
  service: TYPES["service"];
  insertEntityRequestParser: TYPES["insertEntityRequestParser"];
}
