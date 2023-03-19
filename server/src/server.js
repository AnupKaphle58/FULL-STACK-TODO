import app from "./app.js";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";
import config from "./config/config.js";

connectDB();

const serverPort = config.server.port;

const server = app.listen(serverPort, () => {
  logger.info(`
      ################################################
        Server listening on port: ${serverPort} 
      ################################################
  `);
});
