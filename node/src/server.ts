import "@gccunha015/services-core/lib/users/init.mongodb";
import { env, mongoClient } from "@gccunha015/services-core";
import { ProcessEventsHandler } from "@gccunha015/process-events-handler";
import { app } from "./app";

mongoClient
  .connect()
  .then(() => {
    console.log("MongoDB client connected");
    return app.listen(env.PORT, () => {
      console.log(
        `Server listening on ${env.PROTOCOL}://${env.HOST}:${env.PORT}`
      );
    });
  })
  .then((server) => {
    const processEventsHandler = new ProcessEventsHandler(server, mongoClient);
    processEventsHandler.setUpEventsHandling();
  })
  .catch((reason) => {
    console.log(reason);
  });
