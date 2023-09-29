import { IController, IRepository, IService } from "../config";
import { User } from "./model";
import { CreateUserDto, FindUserDto } from "./dtos";

export interface IUsersRepository extends IRepository<User, User> {}
export interface IUsersService extends IService<CreateUserDto, FindUserDto> {}
export interface IUsersController extends IController {}
