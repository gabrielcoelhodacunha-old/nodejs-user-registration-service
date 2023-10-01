import {
  IController,
  IControllerOptions,
  IRepository,
  IRepositoryOptions,
  IService,
  IServiceOptions,
} from "../config";
import {
  CreateUserRequest,
  FindUserRequest,
  User,
  UserResponse,
  findUserFilter,
} from "./types";

export interface IUsersRepository extends IRepository {
  create: (newUser: User) => Promise<void>;
  find: (findUserFilter: findUserFilter) => Promise<User>;
}
export interface IUsersRepositoryOptions extends IRepositoryOptions<User> {}
export interface IUsersService extends IService {
  create: (createUserRequest: CreateUserRequest) => Promise<string>;
  find: (findUserRequest: FindUserRequest) => Promise<UserResponse>;
}
export interface IUsersServiceOptions
  extends IServiceOptions<IUsersRepository> {}
export interface IUsersController extends IController {}
export interface IUsersControllerOptions
  extends IControllerOptions<IUsersService> {}
