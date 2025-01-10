const inTheNextMiddleware = (req, res, next) => {
  console.log('in the next middleware');
  next();
};

module.exports = inTheNextMiddleware;
