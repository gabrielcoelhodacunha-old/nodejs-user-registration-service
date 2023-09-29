import { IDatabaseClient, IServer } from "../types";

export class ProcessEventsHandler {
  private readonly _server: IServer;
  private readonly _databaseClient: IDatabaseClient;

  constructor(server: IServer, databaseClient: IDatabaseClient) {
    this._server = server;
    this._databaseClient = databaseClient;
  }

  public setUpEventsHandling() {
    this._setUpSignalsHandling();
    this._setUpUnexpectedErrorsHandling();
  }

  private _setUpSignalsHandling() {
    process.once("SIGINT", this._setUpGracefulShutdown());
    process.once("SIGTERM", this._setUpGracefulShutdown());
  }

  private _setUpUnexpectedErrorsHandling() {
    process.on("uncaughtException", (error, origin) => {
      console.log(`uncaughtException:\n Error: ${error}\n Origin: ${origin}`);
    });
    process.on("unhandledRejection", (reason) => {
      console.log(`unhandledRejection:\n  Reason: ${reason}`);
    });
  }

  private _setUpGracefulShutdown() {
    return (event: string) => {
      console.log(`\n${event}:`);
      this._server.close(async () => {
        console.log("\tServer closed");
        await this._databaseClient.close();
        console.log("\tDatabase connection closed");
        process.exit(1);
      });
    };
  }
}
