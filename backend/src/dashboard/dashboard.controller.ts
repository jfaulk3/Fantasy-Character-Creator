const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./dashboard.service");

async function read(req: any, res: any, next: any) {
  const user = await service.read(req.user);
  res.json({ data: user });
}

module.exports = {
  read: [asyncErrorBoundary(read)],
};
export {};
