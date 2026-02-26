const router = require("express").Router();
const {
  getItem,
  getItems,
  createItem,
  likeItem,
  unlikeItem,
  deleteItem,
} = require("../controllers/clothingItems");
const {
  validateId,

  validateCardBody,
} = require("../middlewares/validations");

const auth = require("../middlewares/auth");

router.get("/", getItems);
router.get("/:itemId", auth, validateId, getItem);
router.post("/", auth, validateCardBody, createItem);
router.delete("/:itemId", auth, validateId, deleteItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, unlikeItem);

module.exports = router;
