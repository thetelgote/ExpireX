const express =
  require("express");

const router =
  express.Router();

const {
  dashboardStats
} = require(
  "../controllers/dashboardController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/stats",
  protect,
  dashboardStats
);

module.exports = router;