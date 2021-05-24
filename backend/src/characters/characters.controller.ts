const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./characters.service");
const authorization = require("../middleware/authorization");

async function list(req: any, res: any, next: any) {
  res.json({ data: await service.list(req.user) });
}

module.exports = {
  list: [asyncErrorBoundary(authorization), asyncErrorBoundary(list)],
};
export {};
