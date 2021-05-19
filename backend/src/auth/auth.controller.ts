const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bcrypt = require("bcrypt");
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

  res.json({ data });
}

module.exports = {
  create: [asyncErrorBoundary(isEmailNew), asyncErrorBoundary(create)],
};
export {};
