import { z } from "zod";
import { createUserDtoParser, findUserDtoParser } from "./parsers";

export type CreateUserDto = z.infer<typeof createUserDtoParser>;
export type FindUserDto = z.infer<typeof findUserDtoParser>;
