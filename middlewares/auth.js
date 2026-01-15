const { UNAUTHORIZED } = require("../utils/errors");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");

const auth = (req, res, next) => {
  console.log("auth running");
  const { authorization } = req.headers;
  console.log("req headers", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("no auth");
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  console.log("user found");
  const token = authorization.replace("Bearer ", "");
  console.log("token", token);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("payload", payload);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  console.log("Looking for user with ID:", payload._id);
  req.user = payload;
  console.log("req user", req.user);
  next();
};

module.exports = auth;
