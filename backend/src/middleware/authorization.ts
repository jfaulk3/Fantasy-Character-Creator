const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
require("dotenv").config();
//Middleware will look for the jwtToken inside the req header
// that is provided when a user (who is in the database) logins.
interface req extends Request {
  user: number;
}

async function authorization(req: req, res: Response, next: NextFunction) {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    //Checks the token inside the header to see if it matches the jwtSecret
    //variable provided in the .env file.
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = authorization;
export {};
