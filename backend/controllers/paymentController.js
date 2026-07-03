const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


// Create Order
const createOrder = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${bookingId}`
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      booking: bookingId,
      razorpayOrderId: order.id,
      amount
    });

    res.status(201).json({
      success: true,
      order,
      payment
    });

  } catch (error) {
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message
  });
}
  }


// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      bookingId
    } = req.body;

    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.status = "paid";

    await payment.save();

    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "paid"
    });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully"
    });

    await Notification.create({
  user: booking.user,
  booking: booking._id,
  type: "email",
  message: "Payment successful. Your booking is confirmed."
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Revenue (Admin)
const getRevenue = async (req, res) => {
  try {
    const payments = await Payment.find({
      status: "paid"
    });

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.status(200).json({
      success: true,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createOrder,
  verifyPayment,
  getRevenue
};