import { mongoClient } from "./mongo-client";

export const database = mongoClient.db();
