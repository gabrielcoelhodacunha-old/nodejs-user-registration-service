import { Collection, UUID } from "mongodb";
import { database } from "../../database";
import { IUsersRepository, User, UsersRepositoryUpdateInput } from "./types";

export class UsersRepository implements IUsersRepository {
  private readonly _usersCollection: Collection<User>;

  constructor(
    usersCollection: Collection<User> = database.collection<User>("users")
  ) {
    this._usersCollection = usersCollection;
  }

  async findById(id: UUID): Promise<User> {
    const user = await this._usersCollection.findOne<User>(
      { external_id: id },
      { projection: { _id: 0 } }
    );
    if (!user)
      throw new Error(`User with id '${id.toHexString()}' doesn't exist`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this._usersCollection
      .find<User>({}, { projection: { _id: 0 } })
      .toArray();
  }

  async create(newUser: User): Promise<User> {
    await this._usersCollection.insertOne(newUser);
    return this.findById(newUser.external_id);
  }

  async update({ id, newValues }: UsersRepositoryUpdateInput): Promise<User> {
    await this._usersCollection.updateOne(
      { external_id: id },
      { $set: newValues }
    );
    return this.findById(id);
  }
}

export const usersRepository = new UsersRepository();
