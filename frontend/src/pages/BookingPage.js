import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import API from "../services/api";
import "react-calendar/dist/Calendar.css";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingDate, setBookingDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

 const handleBooking = async () => {
  try {
    const bookingRes = await API.post("/bookings", {
      service: id,
      bookingDate,
      timeSlot,
      address,
      totalAmount
    });

    try {
      await API.post("/notifications/send", {
        bookingId: bookingRes.data.booking._id,
        type: "email",
        message:
          "Your booking has been created successfully. Our team will contact you shortly."
      });
    } catch (mailError) {
      console.error("Mail failed:", mailError.response?.data);
    }

    alert("Booking created successfully!");
    navigate("/dashboard");

  } catch (error) {
    console.error(error.response?.data);
    alert(error.response?.data?.message || "Booking failed");
  }
};

  return (
    <div className="container">
      <div className="card booking-card">
        <h1>Book Service</h1>

        <div className="booking-section">
          <label>Select Date</label>
          <Calendar
            onChange={setBookingDate}
            value={bookingDate}
          />
        </div>

        <div className="booking-section">
          <label>Time Slot</label>
          <select
  value={timeSlot}
  onChange={(e) => setTimeSlot(e.target.value)}
>
  <option value="">Select Time Slot</option>
  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
  <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
</select>
        </div>

        <div className="booking-section">
          <label>Service Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="booking-section">
          <label>Total Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        </div>

        <button className="book-btn" onClick={handleBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookingPage;