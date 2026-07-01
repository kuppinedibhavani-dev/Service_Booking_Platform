const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    bookingDate: {
      type: Date,
      required: true
    },

    timeSlot: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
      ],
      default: "pending"
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);