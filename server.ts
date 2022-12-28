import express from "express";
import startDB from "./startup/db";
import startCors from "./startup/cors";
import appRouter from "./startup/routes";
const app = express();

startDB();
startCors(app);
appRouter(app);
const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
 console.log(`Listening on port ${port}...`)
);

module.exports = server;
