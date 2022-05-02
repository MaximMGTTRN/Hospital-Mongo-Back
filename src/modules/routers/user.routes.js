const express = require("express");
const userRoutes = express.Router();
const { check } = require("express-validator");

const {
  getAllUsers,
  createNewUser,
  loginUser,
} = require("../controllers/user.controller");

userRoutes.get("/allUsers", getAllUsers);
userRoutes.post(
  "/createUser",
  [
    check("email", "Введите верный email").notEmpty(),
    check("password", "Пароль должен быть длинее 6 символов!").isLength({
      min: 4,
      max: 50,
    }),
  ],
  createNewUser
);
userRoutes.post("/loginUser", loginUser);

module.exports = userRoutes;
