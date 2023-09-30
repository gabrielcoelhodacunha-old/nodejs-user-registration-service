import { Collection, UUID } from "mongodb";
import { User } from "../../types";
import { UsersRepository } from "../../repository";

describe("Unit Testing | UsersRepository", () => {
  const spies = {} as {
    collection: jest.MockedObject<Collection<User>>;
  };
  const sut = {} as { repository: UsersRepository };

  beforeAll(() => {
    spies.collection = jest.mocked(
      {
        insertOne: jest.fn(),
        findOne: jest.fn(),
      } as jest.MockedObject<Collection<User>>,
      { shallow: true }
    );
    sut.repository = new UsersRepository({ collection: spies.collection });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`feature: creating user`, () => {
    describe(`scenario: passing valid data`, () => {
      const data: User = {
        external_id: new UUID(),
        email: "test@test.com",
        password: "password",
        created_at: new Date(),
      };
      describe(`given data=${JSON.stringify(data, null, 2)}`, () => {
        describe(`when i try to create the user`, () => {
          it(`then i should create it`, async () => {
            async function arrange() {
              spies.collection.findOne.mockResolvedValueOnce(data);
            }
            async function act() {
              try {
                return await sut.repository.create(data);
              } catch (error) {
                return error;
              }
            }
            async function assert(actResult: unknown) {
              expect(actResult).toStrictEqual(data);
            }

            await arrange().then(act).then(assert);
          });
        });
      });
    });

    describe(`scenario: passing invalid data`, () => {
      const data = {} as User;
      describe(`given data=${JSON.stringify(data, null, 2)}`, () => {
        describe(`when i try to create the user`, () => {
          it(`then i should receive an error`, async () => {
            async function arrange() {
              spies.collection.findOne.mockResolvedValueOnce(null);
            }
            async function act() {
              try {
                return await sut.repository.create(data);
              } catch (error) {
                return error;
              }
            }
            async function assert(actResult: unknown) {
              expect(actResult).toBeInstanceOf(Error);
            }

            await arrange().then(act).then(assert);
          });
        });
      });
    });
  });
});
