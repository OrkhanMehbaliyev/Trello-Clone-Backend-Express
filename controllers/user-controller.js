const UserAddDTO = require("../models/userCreateDTO.js");
const userService = require("../services/user-service.js");

const getAllUsers = async (req, res) => {
  const { statCode, result } = await userService.getAllUsers();
  res.status(statCode).json(result);
};

const getOneUser = async (req, res) => {
  const { statCode, result } = await userService.getOneUser(req.params.id);
  res.status(statCode).json(result);
};

const getOneUserByActiveStatus = async (req, res) => {
  const { isActive } = req.query;
  const { statCode, result } = await userService.getOneUserByActiveStatus(
    req.params.id,
    isActive
  );
  res.status(statCode).json(result);
};

const getUserByUsername = async (req, res) => {
  const { statCode, result } = await userService.getUserByUsername(
    req.params.username
  );
  res.status(statCode).json(result);
};

const getUsersByActiveStatus = async (req, res) => {
  const { isActive } = req.query;
  const { statCode, result } = await userService.getUsersByActiveStatus(
    isActive
  );
  res.status(statCode).json(result);
};

const addUser = async (req, res) => {
  const userDTO = new UserAddDTO(req.body);
  const { statCode, result } = await userService.addUser(userDTO);
  res.status(statCode).json(result);
};

module.exports = {
  getAllUsers,
  getOneUser,
  getOneUserByActiveStatus,
  getUserByUsername,
  getUsersByActiveStatus,
  addUser,
};
