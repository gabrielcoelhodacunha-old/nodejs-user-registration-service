import { z } from "zod";
import { userParser } from "./parsers";

export type User = z.infer<typeof userParser>;
