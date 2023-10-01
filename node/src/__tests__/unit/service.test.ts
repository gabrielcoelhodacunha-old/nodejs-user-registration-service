import {
  CreateUserDto,
  FindUserDto,
  IUsersRepository,
  User,
  findUserDtoTransform,
  userObject,
} from "../../types";
import { UsersService } from "../../service";

describe("Unit Testing | UsersService", () => {
  const spies = {} as {
    userObject: { parseAsync: jest.SpyInstance };
    findUserDtoTransform: { parseAsync: jest.SpyInstance };
    repository: jest.MockedObject<IUsersRepository>;
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
    } as jest.MockedObject<IUsersRepository>;
    sut.service = new UsersService({ repository: spies.repository });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`feature: creating user`, () => {
    describe(`scenario: passing valid input
        given input={
          email: "test@test.com",
          password: "password",
        }
        when i try to create the user`, () => {
      it(`then i should create it`, async () => {
        const input: CreateUserDto = {
          email: "test@test.com",
          password: "password",
        };
        async function arrange() {
          const user = input as User;
          const findUserDto = user as unknown as FindUserDto;
          spies.userObject.parseAsync.mockResolvedValueOnce(user);
          spies.repository.create.mockResolvedValueOnce(user);
          spies.findUserDtoTransform.parseAsync.mockResolvedValueOnce(
            findUserDto
          );
        }
        async function act() {
          try {
            return await sut.service.create(input);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toMatchObject<
            Pick<FindUserDto, "email" | "password">
          >(input);
        }

        await arrange().then(act).then(assert);
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
