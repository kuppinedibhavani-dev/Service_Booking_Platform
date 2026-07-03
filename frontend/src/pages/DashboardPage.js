import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardPage() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings");
      setBookings(res.data.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayment = async (bookingId, amount) => {
  try {
    const res = await API.post("/payments/create-order", {
      bookingId,
      amount
    });

    const order = res.data.order;

    const options = {
      key: "rzp_test_T8BXoRw8iEcRtB",
      amount: order.amount,
      currency: order.currency,
      name: "ServeEasy",
      description: "Service Booking Payment",
      order_id: order.id,

      handler: async function (response) {
       try {
  await API.post("/payments/verify", {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
    bookingId
  });

  try {
    await API.post("/notifications/send", {
      bookingId,
      type: "email",
      message: "Payment successful. Your booking is confirmed."
    });
  } catch (mailError) {
    console.log("Mail failed:", mailError.response?.data);
  }

  alert("Payment successful!");
  fetchBookings();

} catch (error) {
  console.error(error.response?.data);
  alert("Payment verification failed");
}
      },

      theme: {
        color: "#007bff"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed");
  }
};

  return (
    <div className="container">
      <h1 className="page-title">My Dashboard</h1>

      <div className="dashboard-grid">
        {bookings.length === 0 ? (
          <h3>No bookings found</h3>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="card dashboard-card">
              <h2>{booking.service.title}</h2>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.bookingDate).toDateString()}
              </p>

              <p>
                <strong>Time Slot:</strong> {booking.timeSlot}
              </p>

              <p>
                <strong>Address:</strong> {booking.address}
              </p>

              <p>
                <strong>Status:</strong> {booking.status}
              </p>

              <p>
                <strong>Payment:</strong> {booking.paymentStatus}
              </p>

              <p>
                <strong>Total:</strong> ₹{booking.totalAmount}
              </p>

              {booking.paymentStatus === "pending" && (
                <button
                  className="pay-btn"
                  onClick={() =>
                    handlePayment(
                      booking._id,
                      booking.totalAmount
                    )
                  }
                >
                  Pay Now
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardPage;