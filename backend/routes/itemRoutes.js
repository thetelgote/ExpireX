const express = require("express");

const router = express.Router();

const {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} = require(
  "../controllers/itemController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

router.route("/")
  .post(protect, addItem)
  .get(protect, getItems);

router.route("/:id")
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;