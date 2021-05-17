function errorHandler(error: any, req: any, res: any, next: any) {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ errors: [message] });
}

export default errorHandler;
