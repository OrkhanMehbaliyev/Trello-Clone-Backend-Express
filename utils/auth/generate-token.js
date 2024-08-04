const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (tokenData) => {
  return jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "5m" });
};

module.exports = generateAccessToken;
