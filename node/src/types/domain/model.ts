import { z } from "zod";
import { userObject } from "./parsers";

export type User = z.infer<typeof userObject>;
