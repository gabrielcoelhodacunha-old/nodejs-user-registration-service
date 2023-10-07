import {
  CreateUserRequest,
  IUsersRepository,
  IUsersService,
  IUsersServiceOptions,
  User,
  UserResponse,
  findUserFilterParser,
  userParser,
  userResponseParser,
} from "./types";
import { usersRepository } from "./repository";

export class UsersService implements IUsersService {
  private readonly _repository: IUsersRepository;

  constructor(
    { repository }: IUsersServiceOptions = { repository: usersRepository }
  ) {
    this._repository = repository;
  }

  async create({ email, ...rest }: CreateUserRequest): Promise<UserResponse> {
    const user = await this._find({ email });
    if (user) throw new Error(`User with email ${email} already exists`);
    const newUser = await userParser.parseAsync({ email, ...rest });
    await this._repository.create(newUser);
    return userResponseParser.parseAsync(newUser);
  }

  private async _find(
    possibleFilter: Record<"email", string>
  ): Promise<User | null> {
    let result: User | null = null;
    try {
      const filter = await findUserFilterParser.parseAsync(possibleFilter);
      result = await this._repository.find(filter);
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !error.message.match("User with filters doesn't exist")
      )
        throw error;
    } finally {
      return result;
    }
  }
}

export const usersService = new UsersService();
