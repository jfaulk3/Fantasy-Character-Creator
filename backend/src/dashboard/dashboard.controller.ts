const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./dashboard.service");
const authorization = require("../middleware/authorization");

async function read(req: any, res: any, next: any) {
  const user = await service.read(req.user);
  res.json({ data: user });
}

module.exports = {
  read: [asyncErrorBoundary(authorization), asyncErrorBoundary(read)],
};
export {};
