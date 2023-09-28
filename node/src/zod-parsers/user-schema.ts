import { z } from "zod";
import { dateSchema, emailSchema, mongoUuidSchema } from "../../../utils";

export const userSchema = z
  .object({
    external_id: mongoUuidSchema,
    email: emailSchema,
    password: z.string().min(8),
    created_at: dateSchema,
    // Placeholder: type should be under sessions feature
    sessions: z.array(z.object({})).default([]),
    // Placeholder: type should be under roles feature and should access database to find possible roles
    roles: z.array(z.enum(["admin", "viewer", "user"])).default(["user"]),
  })
  .strict();
