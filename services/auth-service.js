const pool = require("../config/db");
const UserLoginDTO = require("../models/userLoginDTO");
const userService = require("../services/user-service");
const {
  USER_DOES_NOT_EXIST,
  USER_DEACTIVATED,
  PASSWORD_INCORRECT,
  USER_LOGIN_SUCCESSFUL,
} = require("../utils/messages/user-messages");
const { ErrorResult, SuccessResult } = require("../utils/result");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Transfer = require("../utils/Transfer");
const generateAccessToken = require("../utils/auth/generate-token");
const Tokens = require("../utils/auth/tokens");
require("dotenv").config();

/**
 *
 * @param {UserLoginDTO} UserLoginDTO
 */
const loginUser = async (UserLoginDTO) => {
  const { result: userExistingResult } = await userService.getUserByUsername(
    UserLoginDTO?.username
  );

  if (userExistingResult.success && userExistingResult.data == null)
    return Transfer(400, new ErrorResult(USER_DOES_NOT_EXIST));

  if (!userExistingResult.data.isactive)
    return Transfer(400, new ErrorResult(USER_DEACTIVATED));

  const passwordCheckResult = await bcrypt.compare(
    UserLoginDTO.password,
    userExistingResult.data.password
  );

  if (!passwordCheckResult)
    return Transfer(400, new ErrorResult(PASSWORD_INCORRECT));

  const tokenData = { username: userExistingResult.data.username };

  const accessToken = generateAccessToken(tokenData);
  const refreshToken = jwt.sign(tokenData, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });

  return Transfer(
    200,
    new SuccessResult(
      USER_LOGIN_SUCCESSFUL,
      new Tokens(accessToken, refreshToken)
    )
  );
};

const forgotPassword = async (username) => {
  const user = userService.getUserByUsername(username);

  if (user.success && user.data == null)
    return Transfer(400, new ErrorResult(USER_DOES_NOT_EXIST));

  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 15);

  const id = `${username}_${expirationDate.getTime()}`;

  return Transfer(
    200,
    new SuccessResult("You can change your password using the link", {
      link: `http://localhost:3003/auth/resetPassword/${id}`,
    })
  );
};

const resetPassword = async (token, newPassword) => {
  const [username, expirationDate] = token.split("_");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await userService.getUserByUsername(username);
  const userId = user.data.id;

  if (Number(expirationDate) < new Date().getTime())
    return Transfer(403, new ErrorResult("The link is expired"));

  const result = await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
    [hashedPassword, userId]
  );

  return Transfer(200, new SuccessResult("Password changed successfully"));
};

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
};
