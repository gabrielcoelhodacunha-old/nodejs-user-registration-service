import { z } from "zod";
import { userSchema } from "../zod-parsers";

export type User = z.infer<typeof userSchema>;
