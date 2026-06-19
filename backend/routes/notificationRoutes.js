// const express = require("express");

// const router = express.Router();

// const {
//   getNotifications,
//   markAsRead
// } = require(
//   "../controllers/notificationController"
// );

// const {
//   protect
// } = require(
//   "../middleware/authMiddleware"
// );

// router.get(
//   "/",
//   protect,
//   getNotifications
// );

// router.put(
//   "/:id",
//   protect,
//   markAsRead
// );

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require(
  "../controllers/notificationController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  protect,
  getNotifications
);

router.put(
  "/read-all",
  protect,
  markAllAsRead
);

router.put(
  "/:id",
  protect,
  markAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

module.exports = router;