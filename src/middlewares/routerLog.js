export default (req, res, next) => {
  const log = `[${req.method}] ${req.originalUrl}`;
  console.log(log);
  return next();
};
