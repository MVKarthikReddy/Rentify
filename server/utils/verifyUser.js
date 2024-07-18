const jwt = require('jsonwebtoken');
const errorHandler = require('./error.js');

const verifyToken = (req, res, next) => {
  // console.log("hello")
  const token = req.headers['authorization'].split(' ')[1];
  // console.log(req.headers)
  // console.log(token)
  if (!token) {
    // console.log("I am Working Fine")
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('error')
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken