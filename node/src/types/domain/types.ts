import { z } from "zod";
import {
  userParser,
  userResponseParser,
  createUserRequestParser,
  findUserRequestParser,
  findUserFilterParser,
} from "./parsers";

export type User = z.infer<typeof userParser>;
export type UserResponse = z.infer<typeof userResponseParser>;
export type CreateUserRequest = z.infer<typeof createUserRequestParser>;
export type FindUserFilter = z.infer<typeof findUserFilterParser>;
export type FindUserRequest = z.infer<typeof findUserRequestParser>;
