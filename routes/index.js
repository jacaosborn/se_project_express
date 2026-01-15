const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);
router.post("/signin", login);
router.post("/signup", createUser);
module.exports = router;
