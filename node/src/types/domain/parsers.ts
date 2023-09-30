import { z } from "zod";
import {
  hashString,
  dateSchema,
  emailSchema,
  mongoUuidSchema,
} from "../../utils";

export const userObject = z
  .object({
    external_id: mongoUuidSchema,
    email: emailSchema,
    password: z.string().min(8),
    created_at: dateSchema,
  })
  .strict();

export const createUserDtoTransform = userObject
  .pick({
    email: true,
    password: true,
  })
  .transform(async ({ password, ...rest }) => ({
    password: await hashString(password),
    ...rest,
  }));

export const findUserDtoTransform = userObject.transform(
  ({ external_id: id, created_at: createdAt, ...rest }) => ({
    id: id.toHexString(),
    ...rest,
    createdAt,
  })
);
