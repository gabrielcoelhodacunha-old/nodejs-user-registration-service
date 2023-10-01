import {
  IController,
  IControllerOptions,
  IRepository,
  IRepositoryOptions,
  IService,
  IServiceOptions,
} from "../config";
import { User } from "./model";

export interface IUsersRepository extends IRepository {}
export interface IUsersRepositoryOptions extends IRepositoryOptions<User> {}
export interface IUsersService extends IService {}
export interface IUsersServiceOptions
  extends IServiceOptions<IUsersRepository> {}
export interface IUsersController extends IController {}
export interface IUsersControllerOptions
  extends IControllerOptions<IUsersService> {}
