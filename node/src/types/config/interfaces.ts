import { RequestHandler } from "express";
import { Collection, Document } from "mongodb";

interface IRead<T extends Function = Function> {
  findById: T;
}

interface IWrite<T extends Function = Function> {
  create: T;
}

interface IReadWrite<
  READ extends Function = Function,
  WRITE extends Function = Function
> extends IRead<READ>,
    IWrite<WRITE> {}

export interface IRepository extends IReadWrite {}

export interface IRepositoryOptions<ENTITY extends Document> {
  collection: Collection<ENTITY>;
}

export interface IService extends IWrite {}

export interface IServiceOptions<I_REPOSITORY extends IRepository> {
  repository: I_REPOSITORY;
}

export interface IController extends IWrite<RequestHandler> {}

export interface IControllerOptions<I_SERVICE extends IService> {
  service: I_SERVICE;
}
