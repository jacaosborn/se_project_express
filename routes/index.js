const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateLogin,
  validateCreateUser,
} = require("../middlewares/validations");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);
router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);
module.exports = router;
