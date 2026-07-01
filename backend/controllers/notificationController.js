const Notification = require("../models/Notification");
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");


// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Send Notification
const sendBookingNotification = async (req, res) => {
  try {
    const { bookingId, type, message } = req.body;

    const booking = await Booking.findById(bookingId).populate("user");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    const notification = await Notification.create({
      user: booking.user._id,
      booking: bookingId,
      type,
      message
    });

    if (type === "email") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: booking.user.email,
        subject: "Booking Notification",
        text: message
      });

      notification.status = "sent";
      await notification.save();
    }

    res.status(200).json({
      success: true,
      notification
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get My Notifications
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id
    }).populate("booking");

    res.status(200).json({
      success: true,
      notifications
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get All Notifications (Admin)
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("user")
      .populate("booking");

    res.status(200).json({
      success: true,
      notifications
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  sendBookingNotification,
  getMyNotifications,
  getAllNotifications
};