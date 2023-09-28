import { randomUUID } from "node:crypto";
import { UUID } from "mongodb";
import { z } from "zod";

export const uuidSchema = z.string().uuid().default(randomUUID);
export const mongoUuidSchema = z
  .custom<UUID>(
    (data): data is UUID => (data as UUID).toHexString !== undefined
  )
  .default(() => new UUID(randomUUID()));
export const emailSchema = z.string().email();
export const dateSchema = z.date().default(new Date());
