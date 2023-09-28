import { userSchema, findUserDtoTransform } from "./zod-parsers";
import {
  IUsersService,
  IUsersRepository,
  CreateUserDto,
  FindUserDto,
  User,
  UsersServiceUpdateInput,
} from "./types";
import { usersRepository } from "./repository";
import { UUID } from "mongodb";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(repository: IUsersRepository = usersRepository) {
    this._repository = repository;
  }

  async findById(id: string): Promise<FindUserDto> {
    const user = await this._repository.findById(new UUID(id));
    return await findUserDtoTransform.parseAsync(user);
  }

  async findAll(): Promise<FindUserDto[]> {
    const users = await this._repository.findAll();
    return await Promise.all(
      users.map((user) => findUserDtoTransform.parseAsync(user))
    );
  }

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    const newUser = await userSchema.parseAsync(createUserDto);
    const user = await this._repository.create(newUser);
    return await findUserDtoTransform.parseAsync(user);
  }

  async update({
    id,
    newValues,
  }: UsersServiceUpdateInput): Promise<FindUserDto> {
    const updatedUser = await this._repository.update({
      id: new UUID(id),
      newValues,
    });
    return await findUserDtoTransform.parseAsync(updatedUser);
  }
}

export const usersService = new UsersService();
