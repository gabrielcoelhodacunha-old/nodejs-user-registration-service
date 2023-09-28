import { userSchema } from "./user-schema";

export const findUserDtoTransform = userSchema.transform(
  ({ external_id: id, created_at: createdAt, ...rest }) => ({
    id: id.toHexString(),
    ...rest,
    createdAt,
  })
);
