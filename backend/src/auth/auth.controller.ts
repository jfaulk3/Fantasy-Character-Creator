const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
const service = require("./auth.service");

async function isEmailNew(req: any, res: any, next: any) {
  const { email } = req.body.data;
  const findEmail = await service.readEmail(email.toLowerCase());

  if (findEmail) {
    return res.status(401).json("User already exist");
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
  const data = await service.create(name, email.toLowerCase(), bcryptPassword);

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
    return res.status(401).json("Password or Email is incorrect");
  }
  //Check if incoming password is the same as the database password
  const validPassword = await bcrypt.compare(password, findUser.user_password);

  if (!validPassword) {
    return res.status(401).json("Password or Email is incorrect");
  }
  //Give the jwt token
  const token = jwtGenerator(findUser.user_id);
  res.json({ token });
}

function isVerified(req: any, res: any) {
  res.json(true);
}

module.exports = {
  create: [asyncErrorBoundary(isEmailNew), asyncErrorBoundary(create)],
  login: [asyncErrorBoundary(login)],
  isVerified: [asyncErrorBoundary(authorization, 403), isVerified],
};
export {};
