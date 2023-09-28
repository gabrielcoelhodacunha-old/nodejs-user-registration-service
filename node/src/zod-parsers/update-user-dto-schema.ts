import { userSchema } from "./user-schema";

export const updateUserDtoSchema = userSchema
  .omit({ external_id: true, created_at: true })
  .partial();
