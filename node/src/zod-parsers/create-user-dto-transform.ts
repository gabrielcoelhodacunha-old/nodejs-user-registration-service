import { hashString } from "../../../utils";
import { userSchema } from "./user-schema";

export const createUserDtoTransform = userSchema
  .partial({ roles: true })
  .pick({
    email: true,
    password: true,
    roles: true,
  })
  .transform(async ({ password, ...rest }) => ({
    password: await hashString(password),
    ...rest,
  }));
