const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);
router.post("/login", login);
router.post("/signup", createUser);
module.exports = router;
