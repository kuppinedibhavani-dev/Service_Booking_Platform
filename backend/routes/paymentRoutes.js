const express = require("express");
const {
  createOrder,
  verifyPayment,
  getRevenue
} = require("../controllers/paymentController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// Create payment order
router.post("/create-order", protect, createOrder);

// Verify payment
router.post("/verify", protect, verifyPayment);

// Admin revenue dashboard
router.get("/revenue", protect, adminOnly, getRevenue);

module.exports = router;