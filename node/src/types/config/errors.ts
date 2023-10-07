import { StatusCodes } from "http-status-codes";

export abstract class ApplicationError extends Error {
  private _origin: Error | null;
  get origin(): typeof this._origin {
    return this._origin;
  }
  private _statusCode: StatusCodes;
  get statusCode(): typeof this._statusCode {
    return this._statusCode;
  }

  constructor(
    message: string,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    origin?: unknown
  ) {
    super(message);
    this._origin = origin instanceof Error ? origin : null;
    this._statusCode = statusCode;
  }
}
