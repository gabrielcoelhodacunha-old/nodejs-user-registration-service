import { randomUUID } from "node:crypto";
import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import type {
  IInsertUserRequestParser,
  IUsersService,
  InsertUserRequest,
  UserResponse,
} from "@gccunha015/services-core";
import { UsersController } from "../UsersController";

describe("Unit Testing | UsersController", () => {
  const spies = {} as {
    insertUserRequestParser: jest.MockedObject<IInsertUserRequestParser>;
    response: jest.MockedObject<Response>;
    next: jest.MockedObject<NextFunction>;
    service: jest.MockedObject<IUsersService>;
  };
  const sut = {} as { controller: UsersController };

  beforeAll(() => {
    spies.insertUserRequestParser = {
      parseAsync: jest.fn(),
    };
    spies.response = {
      status: jest.fn().mockReturnThis(),
      location: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as jest.MockedObject<Response>;
    spies.next = jest.fn();
    spies.service = { insert: jest.fn() } as jest.MockedObject<IUsersService>;
    sut.controller = new UsersController({
      service: spies.service,
      insertEntityRequestParser: spies.insertUserRequestParser,
    });
  });

  describe("feature: insert user", () => {
    describe("scenario: insert is sucessfull", () => {
      it(`given request has valid body
          when I try to insert a user
          then I should respond with status CREATED
            and location containing the inserted user id
            and json of the inserted user`, async () => {
        let newUser: InsertUserRequest;
        let request: Request;
        let userResponse: UserResponse;
        async function arrange() {
          newUser = { email: "test@test.com", password: "password" };
          request = { body: newUser } as Request;
          userResponse = {
            id: randomUUID(),
            ...newUser,
            createdAt: new Date(),
          };
          spies.insertUserRequestParser.parseAsync.mockResolvedValueOnce(
            newUser
          );
          spies.service.insert.mockResolvedValueOnce(userResponse);
        }
        async function act() {
          await sut.controller.insert(request, spies.response, spies.next);
        }
        async function assert() {
          expect(spies.response.status).toHaveBeenLastCalledWith(
            StatusCodes.CREATED
          );
          expect(spies.response.location).toHaveBeenLastCalledWith(
            expect.stringMatching(userResponse.id)
          );
          expect(spies.response.json).toHaveBeenLastCalledWith(userResponse);
        }

        await arrange().then(act).then(assert);
      });
    });

    describe("scenario: insert results in error", () => {
      it(`given an error occurs
          when I try to insert a user
          then I should call next with the error`, async () => {
        let request: Request;
        let error: Error;
        async function arrange() {
          request = { body: {} } as Request;
          error = new Error("Some error");
          spies.insertUserRequestParser.parseAsync.mockRejectedValueOnce(error);
        }
        async function act() {
          await sut.controller.insert(request, spies.response, spies.next);
        }
        async function assert() {
          expect(spies.next).toHaveBeenLastCalledWith(error);
        }

        await arrange().then(act).then(assert);
      });
    });
  });
});
