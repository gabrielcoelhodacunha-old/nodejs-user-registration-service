import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { env } from "./config";
import {
  IUsersService,
  IUsersController,
  createUserDtoTransform,
} from "./types";
import { usersService } from "./service";

export class UsersController implements IUsersController {
  private readonly _baseUrl = `${env.BASE_URL}/users`;
  private readonly _service: IUsersService;

  constructor(service: IUsersService = usersService) {
    this._service = service;
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createUserDto = await createUserDtoTransform.parseAsync(
        request.body
      );
      const findUserDto = await this._service.create(createUserDto);
      response
        .status(StatusCodes.CREATED)
        .location(`${this._baseUrl}/${findUserDto.id}`)
        .json(findUserDto);
    } catch (error) {
      next(error);
    }
  }
}

export const usersController = new UsersController();
