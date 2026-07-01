const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true
    },

    description: {
      type: String,
      required: [true, "Service description is required"]
    },

    price: {
      type: Number,
      required: [true, "Service price is required"]
    },

    duration: {
      type: Number,
      required: [true, "Service duration is required"]
    },

    category: {
      type: String,
      required: [true, "Service category is required"]
    },

    image: {
      type: String,
      default: ""
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Service", serviceSchema);