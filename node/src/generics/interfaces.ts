import { RequestHandler } from "express";

interface IRead<T extends Function = Function> {
  findById: T;
  findAll: T;
}

interface IWrite<T extends Function = Function> {
  create: T;
  update: T;
}

interface IReadWrite<T extends Function = Function>
  extends IRead<T>,
    IWrite<T> {}

type IRepositoryFunctions =
  | ((id: any) => Promise<any>)
  | (() => Promise<any[]>)
  | ((entityToCreate: any) => Promise<any>)
  | ((id: any, newValues: any) => Promise<any>);

// New interface implementation?
export interface IRepository extends IReadWrite<IRepositoryFunctions> {
  findById(id: any): Promise<any>;
  findAll(): Promise<any[]>;
  create(entityToCreate: any): Promise<any>;
  update(id: any, newValues: any): Promise<any>;
  // Wrong type acceptd, need to figure out how to accept only IRepositoryFunctions
  valuer(): void;
}

export interface IService extends IRepository {}

export interface IController extends IReadWrite<RequestHandler> {}
