import { randomUUID } from "node:crypto";
import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  IUsersService,
  UserResponse,
  createUserRequestParser,
} from "../../types";
import { UsersController } from "../../controller";
import { StatusCodes } from "http-status-codes";

describe("Unit Testing | UsersController", () => {
  const spies = {} as {
    createUserRequestParser: { parseAsync: jest.SpyInstance };
    response: jest.MockedObjectDeep<Response>;
    next: jest.MockedObjectDeep<NextFunction>;
    service: jest.MockedObjectDeep<IUsersService>;
  };
  const sut = {} as { controller: UsersController };

  beforeAll(() => {
    spies.createUserRequestParser = {
      parseAsync: jest
        .spyOn(createUserRequestParser, "parseAsync")
        .mockImplementation(),
    };
    spies.response = jest.mocked({
      status: jest.fn().mockReturnThis(),
      location: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response);
    spies.next = jest.fn();
    spies.service = jest.mocked({ create: jest.fn() } as IUsersService);
    sut.controller = new UsersController({ service: spies.service });
  });

  describe("feature: create user", () => {
    describe("scenario: create is sucessfull", () => {
      it(`given request has valid body
          when I try to create a user
          then I should respond with status CREATED
            and location containing the created user id
            and json of the created user`, async () => {
        let createUserRequest: CreateUserRequest;
        let request: Request;
        let userResponse: UserResponse;
        async function arrange() {
          createUserRequest = { email: "test@test.com", password: "password" };
          request = { body: createUserRequest } as Request;
          userResponse = {
            id: randomUUID(),
            ...createUserRequest,
            createdAt: new Date(),
          };
          spies.createUserRequestParser.parseAsync.mockResolvedValueOnce(
            createUserRequest
          );
          spies.service.create.mockResolvedValueOnce(userResponse);
        }
        async function act() {
          await sut.controller.create(request, spies.response, spies.next);
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

    describe("scenario: create results in error", () => {
      it(`given an error occurs
          when I try to create a user
          then I should call next with the error`, async () => {
        let request: Request;
        let error: Error;
        async function arrange() {
          request = { body: {} } as Request;
          error = new Error("Some error");
          spies.createUserRequestParser.parseAsync.mockRejectedValueOnce(error);
        }
        async function act() {
          await sut.controller.create(request, spies.response, spies.next);
        }
        async function assert() {
          expect(spies.next).toHaveBeenLastCalledWith(error);
        }

        await arrange().then(act).then(assert);
      });
    });
  });
});
