import { z } from "zod";
import {
  hashString,
  dateParser,
  emailParser,
  mongoUuidParser,
} from "../../utils";

export const userParser = z
  .object({
    external_id: mongoUuidParser,
    email: emailParser,
    password: z.string().min(8),
    created_at: dateParser,
  })
  .strict();

export const createUserDtoParser = userParser
  .pick({
    email: true,
    password: true,
  })
  .transform(async ({ password, ...rest }) => ({
    password: await hashString(password),
    ...rest,
  }));

export const findUserDtoParser = userParser.transform(
  ({ external_id: id, created_at: createdAt, ...rest }) => ({
    id: id.toHexString(),
    ...rest,
    createdAt,
  })
);
