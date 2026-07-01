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
    await API.post("/bookings", {
      service: id,
      bookingDate,
      timeSlot,
      address,
      totalAmount
    });

    alert("Booking created successfully!");
    navigate("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Booking failed");
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
          <input
            type="text"
            placeholder="Ex: 10:00 AM - 11:00 AM"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          />
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