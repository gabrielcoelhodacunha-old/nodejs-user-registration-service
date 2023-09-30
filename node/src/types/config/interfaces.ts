import { RequestHandler } from "express";
import { Collection, Document } from "mongodb";

interface IWrite<T extends Function = Function> {
  create: T;
}

declare function create<INPUT, OUTPUT>(entityToCreate: INPUT): Promise<OUTPUT>;

export interface IRepositoryOptions<ENTITY extends Document> {
  collection: Collection<ENTITY>;
}

export interface IRepository<INPUT, OUTPUT>
  extends IWrite<typeof create<INPUT, OUTPUT>> {}

export interface IServiceOptions<INPUT, OUTPUT> {
  repository: IRepository<INPUT, OUTPUT>;
}

export interface IService<INPUT, OUTPUT> extends IRepository<INPUT, OUTPUT> {}

export interface IController extends IWrite<RequestHandler> {}
