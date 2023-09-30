import { Collection, UUID } from "mongodb";
import { database } from "./database";
import { IUsersRepository, IUsersRepositoryOptions, User } from "./types";

export class UsersRepository implements IUsersRepository {
  private readonly _collection: Collection<User>;

  constructor(
    { collection }: IUsersRepositoryOptions = {
      collection: database.collection<User>("users"),
    }
  ) {
    this._collection = collection;
  }

  async create(newUser: User): Promise<User> {
    await this._collection.insertOne(newUser);
    return this._findById(newUser.external_id);
  }

  private async _findById(id: UUID): Promise<User> {
    const user = await this._collection.findOne<User>(
      { external_id: id },
      { projection: { _id: 0 } }
    );
    if (!user) throw new Error(`User with id ${id} doesn't exist`);
    return user;
  }
}

export const usersRepository = new UsersRepository();
