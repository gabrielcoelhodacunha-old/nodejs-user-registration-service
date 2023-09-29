import { RequestHandler } from "express";

interface IWrite<T extends Function = Function> {
  create: T;
}

declare function create<INPUT, OUTPUT>(entityToCreate: INPUT): Promise<OUTPUT>;

export interface IRepository<INPUT, OUTPUT>
  extends IWrite<typeof create<INPUT, OUTPUT>> {}

export interface IService<INPUT, OUTPUT> extends IRepository<INPUT, OUTPUT> {}

export interface IController extends IWrite<RequestHandler> {}
