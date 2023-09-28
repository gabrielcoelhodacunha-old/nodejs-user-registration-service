import { UUID } from "mongodb";
import {
  IRepository,
  IService,
  IController,
  IRepositoryInput,
  IRepositoryOutput,
  IServiceInput,
  IServiceOutput,
  XIRepository,
} from "../../../generics";
import { CreateUserDto, FindUserDto } from "./dtos";
import { User } from "./model";
import { UsersRepositoryUpdateInput, UsersServiceUpdateInput } from "./inputs";

export interface IUsersRepository extends XIRepository {}

// export interface IUsersRepository
//   extends IRepository<
//     IRepositoryInput<UUID, undefined, User, UsersRepositoryUpdateInput>,
//     IRepositoryOutput<
//       Promise<User>,
//       Promise<User[]>,
//       Promise<User>,
//       Promise<User>
//     >
//   > {}
export interface IUsersService
  extends IService<
    IServiceInput<string, undefined, CreateUserDto, UsersServiceUpdateInput>,
    IServiceOutput<
      Promise<FindUserDto>,
      Promise<FindUserDto[]>,
      Promise<FindUserDto>,
      Promise<FindUserDto>
    >
  > {}
export interface IUsersController extends IController {}
