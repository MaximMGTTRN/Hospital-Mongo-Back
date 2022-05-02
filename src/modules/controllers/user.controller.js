const User = require("../../db/models/user/index.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTrueTiken = (_id) => {
  const secret = process.env.SECRET;
  const payload = {
    id: _id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports.getAllUsers = (req, res) => {
  User.find().then((result) => {
    res.send({
      data: result,
    });
  }); 
}; 

module.exports.createNewUser = async (req, res) => {
  if (req.body) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "regitration error" });
    }
    const { body } = req;
    if (body.hasOwnProperty("email") && body.hasOwnProperty("password")) {
      const { email, password } = body;
      const candidate = await User.findOne({
        email,
      });
      if (candidate) {
        return res.status(400).json({
          message: "Пользователь с такой почтой уже существует",
        });
      }
      const hashPass = bcrypt.hashSync(password, 7);
      const user = new User({ email, password: hashPass });
      user.save().then(async (result) => {
        const trueUser = await User.findOne({ email });
        token = generateTrueTiken(trueUser._id);
        res.send(token);
      });
    } else {
      res.status(422).send("Error! Wrong body");
    }
  } else {
    res.status(422).send("Error! This is not body!");
  }
};

module.exports.loginUser = async (req, res) => {
  if (req.body) {
    const { body } = req;
    if (body.hasOwnProperty("email") && body.hasOwnProperty("password")) {
      const { email, password } = body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(422).send("User not found!");
      }
      const truePassword = bcrypt.compareSync(password, user.password);
      if (!truePassword) {
        return res.status(422).send({message:"Password not correct!"});
      }
      const token = generateTrueTiken(user._id);
      return res.send(token);
    } else {
      return res.status(420).send("Wrong body!");
    }
  } else {
    return res.status(400).send("Bad request! Write wrong data!");
  }
};
