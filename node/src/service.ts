import {
  CreateUserDto,
  FindUserDto,
  IUsersRepository,
  IUsersService,
  IUsersServiceOptions,
  findUserDtoParser,
  userParser,
} from "./types";
import { mongoUuidParser } from "./utils";
import { usersRepository } from "./repository";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(
    { repository }: IUsersServiceOptions = { repository: usersRepository }
  ) {
    this._repository = repository;
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    const newUser = await userParser.parseAsync(createUserDto);
    await this._repository.create(newUser);
    return newUser.external_id.toHexString();
  }

  async findById(id: string): Promise<FindUserDto> {
    const uuid = await mongoUuidParser.parseAsync(id);
    const user = await this._repository.findById(uuid);
    return findUserDtoParser.parseAsync(user);
  }
}

export const usersService = new UsersService();
