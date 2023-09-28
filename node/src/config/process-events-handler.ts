import { Server as HttpServer } from "node:http";
import { Server as HttpsServer } from "node:https";
import { MongoClient } from "mongodb";

export class ProcessEventsHandler {
  private readonly _server: HttpServer | HttpsServer;
  private readonly _databaseClient: MongoClient;

  constructor(server: HttpServer | HttpsServer, databaseClient: MongoClient) {
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
        /* istanbul ignore next */
        const server =
          this._server instanceof HttpsServer ? "HttpsServer" : "HttpServer";
        console.log(` ${server} closed`);
        await this._databaseClient.close();
        console.log(" Database connection closed");
        process.exit(1);
      });
    };
  }
}
