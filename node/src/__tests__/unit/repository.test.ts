import { Collection, UUID } from "mongodb";
import { User } from "../../types";
import { UsersRepository } from "../../repository";

describe("Unit Testing | UsersRepository", () => {
  const spies = {} as {
    collection: jest.MockedObject<Collection<User>>;
  };
  const sut = {} as { repository: UsersRepository };

  beforeAll(() => {
    spies.collection = {
      insertOne: jest.fn(),
      findOne: jest.fn(),
    } as jest.MockedObject<Collection<User>>;
    sut.repository = new UsersRepository({ collection: spies.collection });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`feature: saving new user to database`, () => {
    describe(`scenario: saving is sucessful
        given new user has external id of valid UUID
          and email of "test@test.com"
          and password of "password"
          and created at of valid date
        when i try to save the user to the database`, () => {
      it(`then i should save it`, async () => {
        let newUser: User;
        async function arrange() {
          newUser = {
            external_id: new UUID(),
            email: "test@test.com",
            password: "password",
            created_at: new Date(),
          };
          spies.collection.insertOne.mockResolvedValueOnce({
            acknowledged: true,
          } as any);
        }
        async function act() {
          try {
            return await sut.repository.create(newUser);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toBe(true);
        }

        await arrange().then(act).then(assert);
      });
    });
  });

  describe(`feature: finding user by it's id`, () => {
    describe(`scenario: finding is sucessful
        given id belongs to user in database
        when i try to find the user`, () => {
      it(`then i should find it`, async () => {
        let id: UUID;
        let expected: Pick<User, "external_id">;
        async function arrange() {
          id = new UUID();
          expected = {
            external_id: id,
          };
          spies.collection.findOne.mockResolvedValueOnce(expected);
        }
        async function act() {
          try {
            return await sut.repository.findById(id);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toStrictEqual(expected);
        }

        await arrange().then(act).then(assert);
      });
    });

    describe(`scenario: finding results in error
        given id doesn't belong to user in database
        when i try to find the user`, () => {
      it(`then i should receive the error 'User with id {id} doesn't exist'`, async () => {
        let id: UUID;
        async function arrange() {
          id = new UUID();
          spies.collection.findOne.mockResolvedValueOnce(null);
        }
        async function act() {
          try {
            return await sut.repository.findById(id);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toHaveProperty(
            "message",
            expect.stringMatching(`User with id ${id} doesn't exist`)
          );
        }

        await arrange().then(act).then(assert);
      });
    });
  });
});
