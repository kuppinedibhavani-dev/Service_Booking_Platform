const express = require("express");
const {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// Create service (Admin only)
router.post("/", protect, adminOnly, createService);

// Get all services
router.get("/", getAllServices);

// Get single service
router.get("/:id", getSingleService);

// Update service (Admin only)
router.put("/:id", protect, adminOnly, updateService);

// Delete service (Admin only)
router.delete("/:id", protect, adminOnly, deleteService);

module.exports = router;