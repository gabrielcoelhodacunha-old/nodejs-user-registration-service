import {
  CreateUserDto,
  FindUserDto,
  IUsersRepository,
  IUsersService,
  IUsersServiceOptions,
  findUserDtoTransform,
  userObject,
} from "./types";
import { usersRepository } from "./repository";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(
    { repository }: IUsersServiceOptions = { repository: usersRepository }
  ) {
    this._repository = repository;
  }

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    const newUser = await userObject.parseAsync(createUserDto);
    const user = await this._repository.create(newUser);
    return await findUserDtoTransform.parseAsync(user);
  }
}

export const usersService = new UsersService();
