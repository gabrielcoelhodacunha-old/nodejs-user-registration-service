import { randomUUID } from "node:crypto";
import {
  CreateUserDto,
  FindUserDto,
  IUsersRepository,
  findUserDtoParser,
  userParser,
} from "../../types";
import { mongoUuidParser } from "../../utils";
import { UsersService } from "../../service";

describe("Unit Testing | UsersService", () => {
  const spies = {} as {
    userParser: { parseAsync: jest.SpyInstance };
    mongoUuidParser: { parseAsync: jest.SpyInstance };
    findUserDtoParser: { parseAsync: jest.SpyInstance };
    repository: jest.MockedObject<IUsersRepository>;
  };
  const sut = {} as { service: UsersService };

  beforeAll(() => {
    spies.userParser = {
      parseAsync: jest.spyOn(userParser, "parseAsync").mockImplementation(),
    };
    spies.mongoUuidParser = {
      parseAsync: jest
        .spyOn(mongoUuidParser, "parseAsync")
        .mockImplementation(),
    };
    spies.findUserDtoParser = {
      parseAsync: jest
        .spyOn(findUserDtoParser, "parseAsync")
        .mockImplementation(),
    };
    spies.repository = {
      create: jest.fn(),
      findById: jest.fn(),
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
        let createUserDto: CreateUserDto;
        let expected: boolean;
        async function arrange() {
          createUserDto = {
            email: "test@test.com",
            password: "password",
          };
          expected = true;
          spies.repository.create.mockResolvedValueOnce(expected);
        }
        async function act() {
          try {
            return await sut.service.create(createUserDto);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toBe(expected);
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
        let id: string;
        let expected: Pick<FindUserDto, "id">;
        async function arrange() {
          id = randomUUID();
          expected = { id };
          spies.findUserDtoParser.parseAsync.mockResolvedValueOnce(expected);
        }
        async function act() {
          try {
            return await sut.service.findById(id);
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
  });
});
