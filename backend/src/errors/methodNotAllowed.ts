function methodNotAllowed(req: any, res: any, next: any) {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}

module.exports = methodNotAllowed;
