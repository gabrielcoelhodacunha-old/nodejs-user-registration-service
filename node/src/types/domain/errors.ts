import { StatusCodes } from "http-status-codes";
import { ApplicationError } from "../config";

export class UserNotFoundError extends ApplicationError {
  constructor(origin?: unknown) {
    super(origin, "User not found", StatusCodes.NOT_FOUND);
  }
}

export class UserExistsError extends ApplicationError {
  constructor(email: string, origin?: unknown) {
    super(
      origin,
      `User with email '${email}' already exists`,
      StatusCodes.CONFLICT
    );
  }
}
