import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { env } from "../../config";
import { uuidSchema } from "../../utils";
import { IUsersController, IUsersService } from "./types";
import { createUserDtoTransform } from "./zod-parsers";
import { usersService } from "./service";

export class UsersController implements IUsersController {
  private readonly _baseUrl = `${env.BASE_URL}/users`;
  private readonly _service: IUsersService;

  constructor(service: IUsersService = usersService) {
    this._service = service;
  }

  async findById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = await uuidSchema.parseAsync(request.params.id);
      const findUserDto = await this._service.findById(id);
      response.status(StatusCodes.OK).json(findUserDto);
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const findUserDtos = await this._service.findAll();
      response.status(StatusCodes.OK).json(findUserDtos);
    } catch (error) {
      next(error);
    }
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
