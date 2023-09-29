import { Server as HttpServer } from "node:http";
import { Server as HttpsServer } from "node:https";
import { MongoClient } from "mongodb";
import { RequestHandler } from "express";

export interface IServer {
  close: typeof HttpServer.prototype.close | typeof HttpsServer.prototype.close;
}

export interface IDatabaseClient {
  close: typeof MongoClient.prototype.close;
}

interface IWrite<T extends Function = Function> {
  create: T;
}

declare function create<INPUT, OUTPUT>(entityToCreate: INPUT): Promise<OUTPUT>;

export interface IRepository<INPUT, OUTPUT>
  extends IWrite<typeof create<INPUT, OUTPUT>> {}

export interface IService<INPUT, OUTPUT> extends IRepository<INPUT, OUTPUT> {}

export interface IController extends IWrite<RequestHandler> {}
