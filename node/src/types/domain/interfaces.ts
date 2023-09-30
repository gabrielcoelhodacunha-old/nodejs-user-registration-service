import {
  IController,
  IControllerOptions,
  IRepository,
  IRepositoryOptions,
  IService,
  IServiceOptions,
} from "../config";
import { User } from "./model";
import { CreateUserDto, FindUserDto } from "./dtos";

export interface IUsersRepository extends IRepository<User, User> {}
export interface IUsersRepositoryOptions extends IRepositoryOptions<User> {}
export interface IUsersService extends IService<CreateUserDto, FindUserDto> {}
export interface IUsersServiceOptions
  extends IServiceOptions<IUsersRepository> {}
export interface IUsersController extends IController {}
export interface IUsersControllerOptions
  extends IControllerOptions<IUsersService> {}
