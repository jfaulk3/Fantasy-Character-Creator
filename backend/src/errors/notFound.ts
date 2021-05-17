function notFound(req: any, res: any, next: any) {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
}

export default notFound;
