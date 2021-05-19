require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const authRouter = require("./auth/auth.route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/ping", (_request: any, response: any, _next: any) => {
  response.json({ data: "pong!" });
});

app.use("/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
export {};
