const Booking = require("../models/Booking");
const Service = require("../models/Service");


// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      service,
      bookingDate,
      timeSlot,
      address,
      totalAmount
    } = req.body;

    const serviceExists = await Service.findById(service);

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    const existingBooking = await Booking.findOne({
      service,
      bookingDate,
      timeSlot,
      status: { $ne: "cancelled" }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Time slot already booked"
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      service,
      bookingDate,
      timeSlot,
      address,
      totalAmount
    });

    res.status(201).json({
      success: true,
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id
    }).populate("service");

    res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get All Bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("service");

    res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Update Booking Status
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "cancelled"
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
};