import { Server } from "node:http";
import { MongoClient } from "mongodb";
import { mongoClient } from "../../database";
import { ProcessEventsHandler } from "../process-events-handler";

describe("Unit Testing | ProcessEventsHandler", () => {
  const spies = {} as {
    process: {
      once: jest.SpyInstance;
      on: jest.SpyInstance;
      exit: jest.SpyInstance;
    };
    console: { log: jest.SpyInstance };
  };
  const mocks = {} as {
    httpServer: jest.MockedObjectDeep<Server>;
    databaseClient: jest.MockedObjectDeep<MongoClient>;
  };
  const sut = {} as { processEventsHandler: ProcessEventsHandler };

  beforeAll(() => {
    spies.process = {
      once: jest.spyOn(process, "once").mockImplementation(),
      on: jest.spyOn(process, "on").mockImplementation(),
      exit: jest.spyOn(process, "exit").mockImplementation(),
    };
    spies.console = { log: jest.spyOn(console, "log").mockImplementation() };
    mocks.httpServer = jest.mocked(new Server());
    mocks.httpServer.close = jest
      .fn()
      .mockImplementation((callback) => callback());
    mocks.databaseClient = jest.mocked(mongoClient);
    mocks.databaseClient.close = jest.fn();
    sut.processEventsHandler = new ProcessEventsHandler(
      mocks.httpServer,
      mocks.databaseClient
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("setUpEventsHandling", () => {
    const suiteCalls = { process: { once: [], on: [] } } as {
      process: {
        once: { event: string; listener: Function }[];
        on: { event: string; listener: Function }[];
      };
    };

    beforeEach(() => {
      sut.processEventsHandler.setUpEventsHandling();
      const processCalls = {
        once: spies.process.once.mock.calls as [string, Function][],
        on: spies.process.on.mock.calls as [string, Function][],
      };
      (Object.keys(processCalls) as (keyof typeof processCalls)[]).forEach(
        (key) => {
          processCalls[key].forEach(([event, listener]) => {
            suiteCalls.process[key].push({ event, listener });
          });
        }
      );
    });

    it("should call _setUpSignalsHandling", () => {
      expect(suiteCalls.process.once[0].event).toBe("SIGINT");
      expect(suiteCalls.process.once[1].event).toBe("SIGTERM");
    });

    it("should call _setUpUnexpectedErrorsHandling", () => {
      expect(suiteCalls.process.on[0].event).toBe("uncaughtException");
      expect(suiteCalls.process.on[1].event).toBe("unhandledRejection");
    });

    it("when SIGINT or SIGTERM occurs, should call _setUpGracefulShutdown internal closure", async () => {
      await suiteCalls.process.once[0].listener();
      expect(mocks.httpServer.close).toHaveBeenCalledTimes(1);
      expect(mocks.databaseClient.close).toHaveBeenCalledTimes(1);
    });

    it("when an uncaughtException occurs, should call the attached listener", () => {
      suiteCalls.process.on[0].listener();
      expect(spies.console.log).toHaveBeenCalledTimes(1);
    });

    it("when an unhandledRejection occurs, should call the attached listener", () => {
      suiteCalls.process.on[1].listener();
      expect(spies.console.log).toHaveBeenCalledTimes(1);
    });
  });
});
