require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

//Error middleware
const authorization = require("./middleware/authorization");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

//Routers
const authRouter = require("./auth/auth.router");
const dashboardRouter = require("./dashboard/dashboard.router");
const charactersRouter = require("./characters/characters.router");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/ping", (_request: any, response: any, _next: any) => {
  response.json({ data: "pong!" });
});

app.use("/auth", authRouter);
app.use("/dashboard", authorization, dashboardRouter);
app.use("/characters", authorization, charactersRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
export {};
