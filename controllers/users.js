const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  USER_EXISTS,
  UNAUTHORIZED,
} = require("../utils/errors");

const JWT_SECRET = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." })
    );
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createUser = (req, res) => {
  const { name, avatarUrl, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatarUrl, email, password: hash }))

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password, ...userData } = user._doc;
      res.status(201).send({ token, user: userData });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res.status(USER_EXISTS).send({ message: "User already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    Promise.reject(new Error(BAD_REQUEST));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password, ...userData } = user._doc;
      res.send({ token, user: userData });
    })

    .catch((err) => {
      console.error(err);
      return res.status(UNAUTHORIZED).send({ message: "Login failed" });
    });
};

const updateUser = (req, res) => {
  const { name, avatarUrl } = req.body;
  const userId = req.user._id;
  const update = { name, avatarUrl };
  User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.code === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login, updateUser };
