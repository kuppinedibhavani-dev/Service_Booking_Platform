import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [revenue, setRevenue] = useState(0);

  const fetchAdminData = async () => {
    try {
      const bookingRes = await API.get("/bookings");
      const revenueRes = await API.get("/payments/revenue");

      setBookings(bookingRes.data.bookings);
      setRevenue(revenueRes.data.totalRevenue);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="admin-stats">
        <div className="card stat-card">
          <h2>Total Bookings</h2>
          <p>{bookings.length}</p>
        </div>

        <div className="card stat-card">
          <h2>Total Revenue</h2>
          <p>₹{revenue}</p>
        </div>
      </div>

      <h2>All Bookings</h2>

      <div className="dashboard-grid">
        {bookings.map((booking) => (
          <div key={booking._id} className="card dashboard-card">
            <h3>{booking.service.title}</h3>

            <p>
              <strong>Customer:</strong> {booking.user.name}
            </p>

            <p>
              <strong>Status:</strong> {booking.status}
            </p>

            <p>
              <strong>Payment:</strong> {booking.paymentStatus}
            </p>

            <p>
              <strong>Amount:</strong> ₹{booking.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardPage;