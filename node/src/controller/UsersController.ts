import {
  IInsertUserRequestParser,
  IUsersService,
  env,
  insertUserRequestParser,
  usersService,
} from "@gccunha015/services-core";
import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import type {
  IUsersController,
  IUsersControllerOptions,
} from "./IUsersController";

export class UsersController implements IUsersController {
  private readonly _baseUrl = `${env.BASE_URL}/users`;
  private readonly _service: IUsersService;
  private readonly _insertUserRequestParser: IInsertUserRequestParser;

  constructor(
    { service, insertEntityRequestParser }: IUsersControllerOptions = {
      service: usersService,
      insertEntityRequestParser: insertUserRequestParser,
    }
  ) {
    this._service = service;
    this._insertUserRequestParser = insertEntityRequestParser;
  }

  async insert(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newUser = await this._insertUserRequestParser.parseAsync(
        request.body
      );
      const userResponse = await this._service.insert(newUser);
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
