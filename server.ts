import express from "express";
import employeeRouter from "./routes/employee.router";
import loggerMiddleware from "./middleware/loggerMiddleware";
import datasource from "./db/data-source";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { authorizationMiddleware } from "./middleware/authorization.middlewear";
import authRouter from "./routes/auth.routes";
import authenticationMiddleware from "./middleware/auth.middleware"
import { LoggerService } from "./services/loggerService";
import departmentRouter from "./routes/departments.router";

const { Client } = require('pg');
const server = express();
const logger = LoggerService.getInstance('server()');

server.use(express.json());
server.use(loggerMiddleware);
server.use("/employee", authenticationMiddleware, employeeRouter);
server.use("/auth", authRouter);
server.use("/department", departmentRouter)
server.use(authorizationMiddleware);
server.use(errorMiddleware) // we need this to happen after employeeRouter has been called
//ie, the error from employeeRouter is then passed to this 

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});


(async () => {
  try{
    await datasource.initialize()
    logger.info('connected')
  }catch {
    logger.error("Failed to connect to db")
    process.exit(1)
  }
  server.listen(3000, () => {
  logger.info("server listening to 3000");
});
})();



