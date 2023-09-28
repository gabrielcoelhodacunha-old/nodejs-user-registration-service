import { env, ProcessEventsHandler } from "./config";
import { app } from "./app";
import { mongoClient } from "./database";

mongoClient
  .connect()
  .then(() => {
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
