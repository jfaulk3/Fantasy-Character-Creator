require("dotenv").config();
import notFound from "./errors/notFound";
import errorHandler from "./errors/errorHandler";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ping", (_request: any, response: any, _next: any) => {
  response.json({ data: "pong!" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
