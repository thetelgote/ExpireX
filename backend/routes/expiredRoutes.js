const express =
  require("express");

const router =
  express.Router();

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const {
  getExpiredItems
} = require(
  "../controllers/expiredController"
);

router.get(
  "/",
  protect,
  getExpiredItems
);

module.exports =
  router;