const app = require('./app')
const http = require("http");
const cors = require("cors");
const config = require('./utils/config')
const logger = require("./utils/logger");

const server = http.createServer(app)


server.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
