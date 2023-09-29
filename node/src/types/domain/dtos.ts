import { z } from "zod";
import { createUserDtoTransform, findUserDtoTransform } from "./parsers";

export type CreateUserDto = z.infer<typeof createUserDtoTransform>;
export type FindUserDto = z.infer<typeof findUserDtoTransform>;
