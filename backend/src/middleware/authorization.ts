const jwt = require("jsonwebtoken");
require("dotenv").config();
async function authorization(req: any, res: any, next: any) {
  const jwtToken = req.header("token");

  if (!jwtToken) {
    return res.status(403).json("Not Authorize");
  }

  const payload = jwt.verify(jwtToken, process.env.jwtSecret);

  req.user = payload.user;
  next();
}

module.exports = authorization;
export {};
