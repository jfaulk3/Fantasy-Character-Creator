const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./dashboard.service");
const authorization = require("../middleware/authorization");

async function list(req: any, res: any, next: any) {
  const user = await service.list(req.user);
  res.json({ data: user });
}

module.exports = {
  list: [asyncErrorBoundary(authorization), asyncErrorBoundary(list)],
};
export {};
