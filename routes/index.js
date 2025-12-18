const router = require("express").Router();
const userRouter = require("../routes/users");
const clothingItemRouter = require("../routes/clothingItems");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);

module.exports = router;
