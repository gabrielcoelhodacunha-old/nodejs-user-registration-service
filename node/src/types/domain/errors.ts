import { StatusCodes } from "http-status-codes";
import { ApplicationError } from "../config";

export class UserNotFoundError extends ApplicationError {
  constructor(origin?: unknown) {
    super("User not found", StatusCodes.NOT_FOUND, origin);
  }
}
