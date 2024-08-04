const jwt = require("jsonwebtoken");
const { ErrorResult } = require("../utils/result");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const authenticationHeader = req.headers["authorization"];

  const token = authenticationHeader && authenticationHeader.split(" ")[1];

  if (!token) res.sendStatus(401).json(new ErrorResult("There is no token"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json(new ErrorResult("Token has been expired"));
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authenticateUser;
