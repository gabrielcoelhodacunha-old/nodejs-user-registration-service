import {
  CreateUserDto,
  FindUserDto,
  User,
  findUserDtoTransform,
  userObject,
} from "../../types";
import { UsersRepository } from "../../repository";
import { UsersService } from "../../service";

describe("Unit Testing | UsersRepository", () => {
  const spies = {} as {
    userObject: { parseAsync: jest.SpyInstance };
    findUserDtoTransform: { parseAsync: jest.SpyInstance };
    repository: jest.MockedObject<UsersRepository>;
  };
  const sut = {} as { service: UsersService };

  beforeAll(() => {
    spies.userObject = {
      parseAsync: jest.spyOn(userObject, "parseAsync").mockImplementation(),
    };
    spies.findUserDtoTransform = {
      parseAsync: jest
        .spyOn(findUserDtoTransform, "parseAsync")
        .mockImplementation(),
    };
    spies.repository = {
      create: jest.fn(),
    } as jest.MockedObject<UsersRepository>;
    sut.service = new UsersService({ repository: spies.repository });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`feature: creating user`, () => {
    describe(`scenario: passing valid data`, () => {
      const data: CreateUserDto = {
        email: "test@test.com",
        password: "password",
      };
      describe(`given data=${JSON.stringify(data, null, 2)}`, () => {
        describe(`when i try to create the user`, () => {
          it(`then i should create it`, async () => {
            async function arrange() {
              const user = data as User;
              const findUserDto = user as unknown as FindUserDto;
              spies.userObject.parseAsync.mockResolvedValueOnce(user);
              spies.repository.create.mockResolvedValueOnce(user);
              spies.findUserDtoTransform.parseAsync.mockResolvedValueOnce(
                findUserDto
              );
            }
            async function act() {
              try {
                return await sut.service.create(data);
              } catch (error) {
                return error;
              }
            }
            async function assert(actResult: unknown) {
              console.log(actResult);
              expect(actResult).toMatchObject<
                Pick<FindUserDto, "email" | "password">
              >(data);
            }

            await arrange().then(act).then(assert);
          });
        });
      });
    });

    /*
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
    */
  });
});
