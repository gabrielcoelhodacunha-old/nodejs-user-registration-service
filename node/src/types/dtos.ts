import { z } from "zod";
import {
  createUserDtoTransform,
  findUserDtoTransform,
  updateUserDtoSchema,
} from "../zod-parsers";

export type CreateUserDto = z.infer<typeof createUserDtoTransform>;
export type FindUserDto = z.infer<typeof findUserDtoTransform>;
export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
