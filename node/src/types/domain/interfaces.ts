import { UUID } from "mongodb";
import {
  IController,
  IControllerOptions,
  IRepository,
  IRepositoryOptions,
  IService,
  IServiceOptions,
} from "../config";
import { CreateUserDto, FindUserDto } from "./dtos";
import { User } from "./model";

export interface IUsersRepository extends IRepository {
  create: (newUser: User) => Promise<boolean>;
  findById: (id: UUID) => Promise<User>;
}
export interface IUsersRepositoryOptions extends IRepositoryOptions<User> {}
export interface IUsersService extends IService {
  create: (createUserDto: CreateUserDto) => Promise<boolean>;
  findById: (id: string) => Promise<FindUserDto>;
}
export interface IUsersServiceOptions
  extends IServiceOptions<IUsersRepository> {}
export interface IUsersController extends IController {}
export interface IUsersControllerOptions
  extends IControllerOptions<IUsersService> {}
