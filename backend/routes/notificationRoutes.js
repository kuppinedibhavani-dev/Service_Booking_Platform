const express = require("express");
const {
  sendBookingNotification,
  getMyNotifications,
  getAllNotifications
} = require("../controllers/notificationController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// Send booking notification
router.post("/send", protect, sendBookingNotification);

// Customer notifications
router.get("/my-notifications", protect, getMyNotifications);

// Admin all notifications
router.get("/", protect, adminOnly, getAllNotifications);

module.exports = router;