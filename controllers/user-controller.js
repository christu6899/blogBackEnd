const User = require("../models/user-model");
const validation = require("../config/validation");
const sequelize = require("../db_connection");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { error } = validation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user exists
  await sequelize.sync({ force: false });
  const emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist)
    return res.status(400).send("Email has already been registered.");

  try {
    const savedUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("User not saved.");
  }
};

const userLogin = async (req, res) => {
  // check the validation of data
  const { error } = validation.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await sequelize.sync({ force: false });
    const foundUser = await User.findOne({ where: { email: req.body.email } });
    console.log(foundUser);
    if (!foundUser) return res.status(404).send("user not exist");
    const isLogin = await foundUser.comparePassword(
      req.body.password,
      foundUser
    );
    if (isLogin) {
      const tokenObject = { _id: foundUser.id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      res.send({ success: true, token: "JWT " + token, foundUser });
    } else {
      res.status(400).send("wrong password or email");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
