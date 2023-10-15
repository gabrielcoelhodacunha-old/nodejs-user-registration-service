import {
  CreateUserRequest,
  IUsersRepository,
  User,
  UserExistsError,
  UserNotFoundError,
  UserResponse,
  userParser,
  userResponseParser,
} from "../../types";
import { UsersService } from "../../service";

describe("Unit Testing | UsersService", () => {
  const spies = {} as {
    userParser: { parseAsync: jest.SpyInstance };
    userResponseParser: { parseAsync: jest.SpyInstance };
    repository: jest.MockedObject<IUsersRepository>;
  };
  const sut = {} as { service: UsersService };

  beforeAll(() => {
    spies.userParser = {
      parseAsync: jest.spyOn(userParser, "parseAsync").mockImplementation(),
    };
    spies.userResponseParser = {
      parseAsync: jest
        .spyOn(userResponseParser, "parseAsync")
        .mockImplementation(),
    };
    spies.repository = {
      create: jest.fn(),
      find: jest.fn(),
    } as jest.MockedObject<IUsersRepository>;
    sut.service = new UsersService({ repository: spies.repository });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`feature: creating user`, () => {
    describe(`scenario: creating is sucessful
        given email of "test@test.com"
          and password of "password"
        when i try to create the user`, () => {
      it(`then i should create it`, async () => {
        let createUserRequest: CreateUserRequest;
        let user: User;
        let expected: UserResponse;
        async function arrange() {
          createUserRequest = {
            email: "test@test.com",
            password: "password",
          };
          user = createUserRequest as User;
          expected = createUserRequest as UserResponse;
          spies.repository.find.mockRejectedValueOnce(new UserNotFoundError());
          spies.userParser.parseAsync.mockResolvedValueOnce(user);
          spies.repository.find.mockResolvedValueOnce(user);
          spies.userResponseParser.parseAsync.mockResolvedValueOnce(expected);
        }
        async function act() {
          try {
            return await sut.service.create(createUserRequest);
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

    describe(`scenario: creating results in error
        given email belongs to an existing user
        when i try to create the user`, () => {
      it(`then i should receive the UserExistsError`, async () => {
        let createUserRequest: CreateUserRequest;
        let user: User;
        async function arrange() {
          createUserRequest = {
            email: "test@test.com",
            password: "password",
          };
          user = createUserRequest as User;
          spies.repository.find.mockResolvedValueOnce(user);
        }
        async function act() {
          try {
            return await sut.service.create(createUserRequest);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toBeInstanceOf(UserExistsError);
        }

        await arrange().then(act).then(assert);
      });
    });
  });
});
