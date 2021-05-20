import { nextTick } from "process";

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const service = require("./auth.service");

async function isEmailNew(req: any, res: any, next: any) {
  const { email } = req.body.data;
  const findEmail = await service.readEmail(email);

  if (findEmail) {
    next({ status: 401, message: `Email is already registered: ${email}` });
  }
  next();
}

async function create(req: any, res: any) {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body.data;

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword: string = await bcrypt.hash(password, salt);
  const data = await service.create(name, email, bcryptPassword);

  const token = jwtGenerator(data.user_id);

  res.json({ token });
}

async function login(req: any, res: any, next: any) {
  //Destructure the req.body
  const { email, password }: { email: string; password: string } =
    req.body.data;
  //Check if user doesn't exist (if not then throw error)
  const findUser = await service.readEmail(email);
  if (!findUser) {
    return next({ status: 401, message: `Password or Email is incorrect` });
  }
  //Check if incoming password is the same as the database password
  const validPassword = await bcrypt.compare(password, findUser.user_password);

  if (!validPassword) {
    return next({ status: 401, message: `Password or Email is incorrect` });
  }
  //Give the jwt token
  const token = jwtGenerator(findUser.user_id);
  res.json({ token });
}

module.exports = {
  create: [asyncErrorBoundary(isEmailNew), asyncErrorBoundary(create)],
  login: asyncErrorBoundary(login),
};
export {};
