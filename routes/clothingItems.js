const router = require("express").Router();
const {
  getItem,
  getItems,
  createItem,
  likeItem,
  unlikeItem,
  deleteItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.get("/", getItems);
router.get("/:itemId", getItem);
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
