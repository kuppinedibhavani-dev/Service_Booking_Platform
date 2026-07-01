const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
} = require("../controllers/bookingController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// Customer creates booking
router.post("/", protect, createBooking);

// Customer views own bookings
router.get("/my-bookings", protect, getMyBookings);

// Admin views all bookings
router.get("/", protect, adminOnly, getAllBookings);

// Admin updates booking status
router.put("/:id/status", protect, adminOnly, updateBookingStatus);

// Customer cancels booking
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;