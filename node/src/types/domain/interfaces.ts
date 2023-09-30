import {
  IController,
  IRepository,
  IRepositoryOptions,
  IService,
} from "../config";
import { User } from "./model";
import { CreateUserDto, FindUserDto } from "./dtos";

export interface IUsersRepositoryOptions extends IRepositoryOptions<User> {}
export interface IUsersRepository extends IRepository<User, User> {}
export interface IUsersService extends IService<CreateUserDto, FindUserDto> {}
export interface IUsersController extends IController {}
