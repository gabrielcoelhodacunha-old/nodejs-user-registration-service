import type {
  IInsertUserRequestParser,
  IUsersService,
} from "@gccunha015/services-core";
import type { IController, IControllerOptions } from "../utils";

type IUsersControllerOptionsTypes = {
  service: IUsersService;
  insertEntityRequestParser: IInsertUserRequestParser;
};

export interface IUsersController extends IController {}
export interface IUsersControllerOptions
  extends IControllerOptions<IUsersControllerOptionsTypes> {}
