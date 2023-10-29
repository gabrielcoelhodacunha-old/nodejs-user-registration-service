import type { IParser, IService } from "@gccunha015/services-core";

export type IControllerOptionsTypes = {
  service: IService<any>;
  insertEntityRequestParser: IParser<any>;
};
