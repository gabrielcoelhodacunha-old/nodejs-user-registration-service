import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { env } from "./config";
import {
  IUsersService,
  IUsersController,
  IUsersControllerOptions,
  createUserRequestParser,
} from "./types";
import { usersService } from "./service";

export class UsersController implements IUsersController {
  private readonly _baseUrl = `${env.BASE_URL}/users`;
  private readonly _service: IUsersService;

  constructor(
    { service }: IUsersControllerOptions = { service: usersService }
  ) {
    this._service = service;
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createUserRequest = await createUserRequestParser.parseAsync(
        request.body
      );
      const userResponse = await this._service.create(createUserRequest);
      response
        .status(StatusCodes.CREATED)
        .location(`${this._baseUrl}/${userResponse.id}`)
        .json(userResponse);
    } catch (error) {
      next(error);
    }
  }
}

export const usersController = new UsersController();
