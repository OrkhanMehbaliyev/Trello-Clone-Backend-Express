const UserLoginDTO = require("../models/userLoginDTO");
const authService = require("../services/auth-service");
const generateAccessToken = require("../utils/auth/generate-token");
const Tokens = require("../utils/auth/tokens");
const { ErrorResult, SuccessResult } = require("../utils/result");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const userLoginDTO = new UserLoginDTO(req.body);
  const { statCode, result } = await authService.loginUser(userLoginDTO);
  res.status(statCode).json(result);
};

const refreshToken = async (req, res) => {
  const refToken = req.body?.refreshToken;

  if (refToken == null)
    res.status(400).json(new ErrorResult("The refresh token is not valid!"));

  jwt.verify(refToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err)
      res
        .status(403)
        .json(new ErrorResult("Error happened with refresh token", err));

    const accessToken = generateAccessToken({ username: user.username });
    res
      .status(200)
      .json(
        new SuccessResult(
          "Access token renewed successfully!",
          new Tokens(accessToken, refToken)
        )
      );
  });
};

const forgotPassword = async (req, res) => {
  const username = req.body?.username || "";

  const { statCode, result } = await authService.forgotPassword(username);

  res.status(statCode).json(result);
};

const resetPassword = async (req, res) => {
  const token = req.params?.id;
  const newPassword = req.body?.newPassword;

  const { statCode, result } = await authService.resetPassword(
    token,
    newPassword
  );
  res.status(statCode).json(result);
};

module.exports = {
  loginUser,
  forgotPassword,
  refreshToken,
  resetPassword,
};
